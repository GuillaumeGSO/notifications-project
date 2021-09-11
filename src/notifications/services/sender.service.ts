import { Injectable } from "@nestjs/common";
import { UriVersioningOptions } from "@nestjs/common/interfaces";
import { ChannelEnum, Company, User } from "src/company-data/company-data.interface";
import { NotificationDataService } from "./notifications-data.service";

abstract class contentProvider {
    //TODO
}

abstract class EventProcessor {
    abstract run_event(company: Company, user: User): void;
    abstract create_content(): string;
}

export class PayReadyEventProcessor extends EventProcessor {

    run_event(company: Company, user: User) {
        const sender = new SenderService(new EmailNotificationStrategy())
        sender.send_notification(null, null, null)
    }

    create_content() {
        return "content for email pay ready"
    }
}

/**
 * Process the End of the year event by send a UI notification to the user about his balance leave 
 */
export class EndOfYearEventProcessor extends EventProcessor {
    run_event(company: Company, user: User) {
        const sender = new SenderService(new UINotificationStrategy(null))
        sender.send_notification(company, user, "end of the year")
    }
    create_content() {
        return "content for leave reminder"
    }
}

export class BirthdayEventProcessor extends EventProcessor {

    run_event(company: Company, user: User) {
        var strategy = new EmailNotificationStrategy();
        strategy.content = { address: user.email, object: "Happy birthday !", body: `Dear ${user.firstName}, ${company.companyName} is wishing you an happy birthay` } as EmailContent
        var sender = new SenderService(new EmailNotificationStrategy())
        sender.send_notification(company, user, "birthday")
        sender = new SenderService(new UINotificationStrategy(null))
    }
    create_content() {
        return "content for leave reminder happy birthay"
        //FIXME : the content must be different between email and UI
    }

}

export interface INotificationStrategy {
    send(company: Company, user: User): void;
    //Each strategy can choose what to do for its content
    create_content(company: Company, user: User): Content;
}


export class UINotificationStrategy implements INotificationStrategy {

    constructor(private readonly notificationDataService: NotificationDataService) { }

    send(company: Company, user: User) {
        //Do your stuff
        //Is this the place to check if registred ? 
        //Nope : do it database side
        if (ChannelEnum.UI in user.subscribedChannels) {
            console.log(`sending a new notification from ${company.companyName} to ${user.userId}`)
            this.notificationDataService.create_ui_notification(user.userId, "eventype", 'content')
        }
    }

    create_content(company: Company, user: User) {
        return { content: "my content" }
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

    content: EmailContent

    send(company: Company, user: User) {
        console.log(`sending a new email from ${company.companyName} to ${user.userId}`)
    }

    create_content(company: Company, user: User) {
        return { address: user.email, object: "title", body: "my body content" } as EmailContent
    }

}

@Injectable()
export class SenderService {
    constructor(private readonly strategy: INotificationStrategy) {
        this.strategy = strategy
    }

    send_notification(company: Company, user: User, notificationType: string) {
        const content = `Sending notification ${notificationType} from sender  ${user.firstName}`;
        this.strategy.send(company, user);
        return content
    }

}


