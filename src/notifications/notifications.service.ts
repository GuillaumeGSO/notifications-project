import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  ) { }

  async get_notifications_for_user(
    userId: string,
  ): Promise<NotificationData[]> {
    return await this.notificationDataService.get_notifications_for_user(
      userId,
    );

    //FIXING output....return result.map((noti: UINotification) => ({ userId: noti.userId, content: noti.content, type: noti.type }))
  }

  send_notification(notif: CreateNotificationDto): string {

    /**The dto content validation is build-in with 
    /*the app's PipeValidation and decorators used in the dto class
    **/
    
    // get content from database
    const company = this.companyDataService.getCompanyById(notif.companyId);
    const user = this.companyDataService.getUserById(notif.userId);
    const type = notif.notificationType;
    var result: string;

    // Pick the right processor
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
        this.throwBadRequestWithCause(`Notification type (${notif.notificationType}) not supported.`);
      }
    }
    return result;
  }

  throwBadRequestWithCause(cause: string) {
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: cause
    }, HttpStatus.BAD_REQUEST)
  }

}
