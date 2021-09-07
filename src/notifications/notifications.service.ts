import { Injectable } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { NotificationTypeEnum, UINotification } from './interfaces/notification.interface';
import { CreateNotificationDto } from './dto/create-notification.dto'
import { SenderService, UINotificationStrategy } from './services/sender.service';
import { NotificationDataService } from 'src/notification-data/notification-data.service'
@Injectable()
export class NotificationService {
    constructor(private readonly companyDataService: CompanyDataService,
        private readonly notificationDataService: NotificationDataService) { }

    get_notifications_for_user(userId: string): UINotification[] {
        return this.notificationDataService.get_notifications_for_user(userId);
    }

    send_notification(notif: CreateNotificationDto): string {
        //get content from database
        var company = this.companyDataService.get_company_by_id(notif.companyId);
        var user = this.companyDataService.get_user_by_id(notif.userId);
        var type = this.getEnumfromString(notif.notificationType);

        //TODO Pick the right strategy
        var sender = new SenderService(new UINotificationStrategy());
        return sender.send_notification(company, user, type);
    }

    getEnumfromString(typeNotif: string): NotificationTypeEnum {  
        return NotificationTypeEnum.BIRTHDAY;
    }
}
