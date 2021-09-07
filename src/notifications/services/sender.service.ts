import { Injectable } from "@nestjs/common";
import { Company, User } from "src/company-data/company-data.interface";
import { NotificationTypeEnum } from "../interfaces/notification.interface";

export interface INotificationStrategy {
    //TODO check if NotificationType is absolutly required
    send(company: Company, user: User, notificationType: NotificationTypeEnum): void;
}


export class UINotificationStrategy implements INotificationStrategy {
    send(company: Company, user: User, notificationType: NotificationTypeEnum) {
        //Do your stuff
        //Is this the place to check if registred ? 
        //Nope : do it database side
        console.log(`sending a new notification from ${company.companyName} to ${user.userId}`)
    }
}

export class EmailNotifcationSender implements INotificationStrategy {
    send(company: Company, user: User, notificationType: NotificationTypeEnum) {
        console.log(`sending a new email from ${company.companyName} to ${user.userId}`)
    }
}

@Injectable()
export class SenderService {
    constructor(private readonly strategy: INotificationStrategy) { 
        this.strategy = strategy
    }

    send_notification(company: Company, user: User, notificationType: NotificationTypeEnum) {
        console.log('Sending notification from sender', notificationType, user.firstName);
        this.strategy.send(company, user, notificationType);
        return "ok"
    }

}


