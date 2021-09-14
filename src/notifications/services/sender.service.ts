import { Injectable } from '@nestjs/common';
import {
  ChannelEnum,
  Company,
  User,
} from 'src/company-data/company-data.interface';
import { NotificationDataService } from 'src/notification-data/notification-data.service';

abstract class EventProcessor {
  abstract run_event(company: Company, userId: string, type: string): string[];
}

export class PayReadyEventProcessor extends EventProcessor {
  run_event(company: Company, userId: string, type: string): string[] {
    const results: string[] = [];
    const strategy = new EmailNotificationStrategy();
    const sender = new SenderService(strategy);

    company?.users.forEach((user) => {
      if (user.userId === userId && user.subscribedChannels.includes(ChannelEnum.UI)) {
        strategy.content = this.generate_content(company, user);
        results.push(sender.send_notification(company, user, type));
      }
    });
    return results;
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
 * Process the End of the year event by send a UI notification
 * to the user about his balance leave
 */
export class EndOfYearEventProcessor extends EventProcessor {
  constructor(
    private readonly notificationDataService: NotificationDataService,
  ) {
    super();
  }

  run_event(company: Company, userId: string, type: string): string[] {
    const results: string[] = [];
    const strategy: INotificationStrategy = new UINotificationStrategy(
      this.notificationDataService,
    );
    const sender = new SenderService(strategy);

    company?.users.forEach((user) => {
      if (user.userId === userId && user.subscribedChannels.includes(ChannelEnum.UI)) {
        strategy.content = this.generate_ui_content();
        results.push(sender.send_notification(company, user, type));
      }
    });
    return results;
  }

  private generate_ui_content(): Content {
    return {
      content: 'Please check your leave balance before end of the year',
    };
  }
}
/**
 * This event take care of the birthday case
 */
export class BirthdayEventProcessor extends EventProcessor {
  constructor(
    private readonly notificationDataService: NotificationDataService,
  ) {
    super();
  }

  run_event(company: Company, userId: string, type: string): string[] {
    const results: string[] = [];
    const emailStrategy = new EmailNotificationStrategy();
    const uiStrategy = new UINotificationStrategy(this.notificationDataService);
    const emailSender = new SenderService(emailStrategy);
    const uiSender = new SenderService(uiStrategy);

    company?.users.forEach((user) => {
      //Emails
      if (user.userId === userId && user.subscribedChannels.includes(ChannelEnum.EMAIL)) {
        results.push(
          this.send_email(company, user, emailStrategy, type, emailSender),
        );
      }
      //UI Notifications
      if (user.userId === userId && user.subscribedChannels.includes(ChannelEnum.UI)) {
        results.push(
          this.send_ui_notification(company, user, uiStrategy, type, uiSender),
        );
      }
    });
    return results;
  }

  private send_email(
    company: Company,
    user: User,
    strategy: EmailNotificationStrategy,
    type: string,
    sender: SenderService,
  ) {
    strategy.content = this.generate_email_content(company, user);
    return sender.send_notification(company, user, type);
  }

  private generate_email_content(company: Company, user: User): EmailContent {
    return {
      address: user.email,
      object: 'Happy birthday !',
      body: `Dear ${user.firstName}, ${company.companyName} is wishing you an happy birthay`,
    } as EmailContent;
  }

  private send_ui_notification(
    company: Company,
    user: User,
    strategy: UINotificationStrategy,
    type: string,
    sender: SenderService,
  ): string {
    strategy.content = {
      content: `Happy birthday ${user.firstName} !`,
    } as Content;
    return sender.send_notification(company, user, type);
  }
}

/**
 * Stratgies about notifications
 */
export interface INotificationStrategy {
  content: Content;
  send(company: Company, user: User, type: string): string;
}

export class UINotificationStrategy implements INotificationStrategy {
  constructor(
    private readonly notificationDataService: NotificationDataService,
  ) { }

  content: Content;

  send(company: Company, user: User, type: string) {
    this.notificationDataService.create_ui_notification(
      user.userId,
      type,
      this.content.content,
    );
    return `UI Notifiction ${type} added for ${user.lastName} of ${company.companyName}}`;
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

  send(company: Company, user: User, type: string) {
    //This is where we should call a real email service
    console.log(
      `Sending a new email from ${company.companyName} to ${user.email}`,
    );
    return type + ' mail sent to user ' + user.email;
  }
}

@Injectable()
export class SenderService {
  constructor(private readonly strategy: INotificationStrategy) {
    this.strategy = strategy;
  }

  send_notification(company: Company, user: User, type: string): string {
    return this.strategy.send(company, user, type);
  }
}
