import { Injectable } from "@nestjs/common";
import { ChannelEnum, Company, User } from "src/company-data/company-data.interface";
import { NotificationTypeEnum } from "../interfaces/notification.interface";
import { NotificationDataService } from "./notifications-data.service";

export interface INotificationStrategy {
    //TODO check if NotificationType is absolutly required
    send(company: Company, user: User, notificationType: NotificationTypeEnum): void;
}


export class UINotificationStrategy implements INotificationStrategy {
    
    constructor(private readonly notificationDataService: NotificationDataService) { }
    
    send(company: Company, user: User, notificationType: NotificationTypeEnum) {
        //Do your stuff
        //Is this the place to check if registred ? 
        //Nope : do it database side
        if (ChannelEnum.UI in user.subscribedChannels) {
            console.log(`sending a new notification from ${company.companyName} to ${user.userId}`)
            this.notificationDataService.create_ui_notification(user.userId, "leave_balance_reminder", 'content')
        }
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


