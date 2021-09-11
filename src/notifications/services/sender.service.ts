import { Injectable } from '@nestjs/common';
import { UriVersioningOptions } from '@nestjs/common/interfaces';
import { start } from 'repl';
import {
  ChannelEnum,
  Company,
  User,
} from 'src/company-data/company-data.interface';
import { NotificationDataService } from './notifications-data.service';

abstract class EventProcessor {
  abstract run_event(company: Company, user: User): void;
}

export class PayReadyEventProcessor extends EventProcessor {
  run_event(company: Company, user: User) {
    const strategy: INotificationStrategy = new EmailNotificationStrategy();
    strategy.content = this.generate_content(company, user);
    const sender = new SenderService(strategy);
    sender.send_notification(company, user);
  }

  private generate_content(company: Company, user: User): EmailContent {
    return {
      address: user.email,
      object: 'Payslip is ready',
      body: `Dear ${user.lastName}, your monthly payslip has been procedeed by ${company.companyName}`,
    } as EmailContent;
  }
}

/**
 * Process the End of the year event by send a UI notification to the user about his balance leave
 */
export class EndOfYearEventProcessor extends EventProcessor {
  run_event(company: Company, user: User) {
    const strategy: INotificationStrategy = new UINotificationStrategy(null);
    strategy.content = this.generate_ui_content();

    const sender = new SenderService(strategy);
    return sender.send_notification(company, user);
  }

  private generate_ui_content(): Content {
    return {
      content: 'Please check your leave balance before end of the year',
    };
  }
}

export class BirthdayEventProcessor extends EventProcessor {
  run_event(company: Company, user: User) {
    this.send_email(company, user);
    this.send_ui_notification(user);
  }

  private send_email(company: Company, user: User) {
    const strategy = new EmailNotificationStrategy();
    strategy.content = this.generate_email_content(company, user);
    const sender = new SenderService(strategy);
    sender.send_notification(company, user);
  }

  private generate_email_content(company: Company, user: User): EmailContent {
    //FIXME : content shouldn't mandatory
    return {
      address: user.email,
      object: 'Happy birthday !',
      body: `Dear ${user.firstName}, ${company.companyName} is wishing you an happy birthay`,
    } as EmailContent;
  }

  private send_ui_notification(user: User) {
    const strategy: INotificationStrategy = new UINotificationStrategy(null);
    strategy.content = {
      content: `Happy birthday ${user.firstName} !`,
    } as Content;
    const sender = new SenderService(strategy);
  }
}

export interface INotificationStrategy {
  content: Content;
  send(company: Company, user: User): void;
}

export class UINotificationStrategy implements INotificationStrategy {
  constructor(
    private readonly notificationDataService: NotificationDataService,
  ) {}

  content: Content;

  send(company: Company, user: User) {
    //Do your stuff
    //Is this the place to check if registred ?
    //Nope : do it database side
    if (ChannelEnum.UI in user.subscribedChannels) {
      console.log(
        `sending a new notification from ${company.companyName} to ${user.userId}`,
      );
      this.notificationDataService.create_ui_notification(
        user.userId,
        'eventype',
        'content',
      );
    }
  }
}

interface Content {
  content: string;
}

interface EmailContent extends Content {
  address: string;
  object: string;
  body: string;
}

export class EmailNotificationStrategy implements INotificationStrategy {
  content: EmailContent;

  send(company: Company, user: User) {
    console.log(
      `sending a new email from ${company.companyName} to ${user.userId}`,
    );
  }
}

@Injectable()
export class SenderService {
  constructor(private readonly strategy: INotificationStrategy) {
    this.strategy = strategy;
  }

  send_notification(company: Company, user: User) {
    console.log(`Sending notification to ${user}`);
    this.strategy.send(company, user);
  }
}
