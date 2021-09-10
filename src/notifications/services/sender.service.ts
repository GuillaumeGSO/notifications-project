import { Injectable } from "@nestjs/common";
import { ChannelEnum, Company, User } from "src/company-data/company-data.interface";
import { NotificationDataService } from "./notifications-data.service";

abstract class contentProvider {
    //TODO
}

abstract class EventProcessor {
    abstract run_event(): void;
    abstract create_content(): string;
}

export class PayReadyEventProcessor extends EventProcessor {
    constructor() {
        super();
    }

    run_event() {
        const sender = new SenderService(new EmailNotificationStrategy())
        sender.send_notification(null, null, null)
    }

    create_content() {
        return "content for email pay ready"
    }
}

export class EndOfYearEventProcessor extends EventProcessor {
    run_event() {
        const sender = new SenderService(new UINotificationStrategy(null))
        sender.send_notification(null, null, null)
    }
    create_content() {
        return "content for leave reminder"
    }
}

export class BirthdayEventProcessor extends EventProcessor {

    run_event() {
        var sender = new SenderService(new EmailNotificationStrategy())
        sender.send_notification(null, null, null)
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
    create_content(company: Company, user: User): any;
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
    create_content(company: Company, user: User) { return "content for UI" }
}

export class EmailNotificationStrategy implements INotificationStrategy {
    send(company: Company, user: User) {
        console.log(`sending a new email from ${company.companyName} to ${user.userId}`)
    }

    create_content(company: Company, user: User) {
        return { email: user.email, object: "title", body: "my body content" }
    }
}

    @Injectable()
    export class SenderService {
    constructor(private readonly strategy: INotificationStrategy) {
        this.strategy = strategy
    }

    send_notification(company: Company, user: User, notificationType: string) {
        console.log('Sending notification from sender', notificationType, user.firstName);
        this.strategy.send(company, user);
        return "ok"
    }

}


