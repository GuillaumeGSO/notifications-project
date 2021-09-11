import { Injectable } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { CreateNotificationDto } from './dto/create-notification.dto'
import { SenderService, UINotificationStrategy, PayReadyEventProcessor, EndOfYearEventProcessor, BirthdayEventProcessor } from './services/sender.service';
import { NotificationDataService } from 'src/notifications/services/notifications-data.service'
import { NotificationData } from './services/notifications-data.model';

@Injectable()
export class NotificationService {
    constructor(private readonly companyDataService: CompanyDataService,
        private readonly notificationDataService: NotificationDataService) { }

    async get_notifications_for_user(userId: string): Promise<NotificationData[]> {
        return await this.notificationDataService.get_notifications_for_user(userId);
        
        //FIXING output....return result.map((noti: UINotification) => ({ userId: noti.userId, content: noti.content, type: noti.type }))
    }

    send_notification(notif: CreateNotificationDto): string {
        //get content from database
        var company = this.companyDataService.get_company_by_id(notif.companyId);
        var user = this.companyDataService.get_user_by_id(notif.userId);
        var type = notif.notificationType;

        //Pick the right strategy
        switch (type) {
            case "leave_balance_reminder": {
                const myLeaveEvent = new EndOfYearEventProcessor();
                myLeaveEvent.run_event(company, user);
                break;
        }
            case "monthly_payslip" : {
                const myPayEvent= new PayReadyEventProcessor();
                myPayEvent.run_event(company, user);
                break;
            }
            case "happy_birthday" : {
                const myBirthdayEvent = new BirthdayEventProcessor();
                myBirthdayEvent.run_event(company, user);
                break;
            }
        }
        return "TODO"
    }
}
