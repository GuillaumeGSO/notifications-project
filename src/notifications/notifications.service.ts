import { Injectable } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  PayReadyEventProcessor,
  EndOfYearEventProcessor,
  BirthdayEventProcessor,
} from './services/sender.service';
import { NotificationDataService } from 'src/notifications/services/notifications-data.service';
import { NotificationData } from './services/notifications-data.model';

@Injectable()
export class NotificationService {
  constructor(
    private readonly companyDataService: CompanyDataService,
    private readonly notificationDataService: NotificationDataService,
  ) {}

  async get_notifications_for_user(
    userId: string,
  ): Promise<NotificationData[]> {
    return await this.notificationDataService.get_notifications_for_user(
      userId,
    );

    //FIXING output....return result.map((noti: UINotification) => ({ userId: noti.userId, content: noti.content, type: noti.type }))
  }

  send_notification(notif: CreateNotificationDto): string {
    //get content from database
    const company = this.companyDataService.get_company_by_id(notif.companyId);
    const user = this.companyDataService.get_user_by_id(notif.userId);
    const type = notif.notificationType;
    let result: string;
    //Pick the right processor
    switch (type) {
      case 'leave-balance-reminder': {
        const myLeaveEvent = new EndOfYearEventProcessor(
          this.notificationDataService,
        );
        result = myLeaveEvent.run_event(company, user);
        break;
      }
      case 'monthly-payslip': {
        const myPayEvent = new PayReadyEventProcessor();
        result = myPayEvent.run_event(company, user);
        break;
      }
      case 'happy-birthday': {
        const myBirthdayEvent = new BirthdayEventProcessor(
          this.notificationDataService,
        );
        result = myBirthdayEvent.run_event(company, user);
        break;
      }
      default: {
        result = 'Notification type not known';
      }
    }
    return result;
  }
}
