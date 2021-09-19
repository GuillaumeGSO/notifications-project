import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CompanyDataService } from '../company-data/company-data.service';
import { NotificationData } from '../notification-data/notification-data.model';
import { NotificationDataService } from '../notification-data/notification-data.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  EndOfYearEventProcessor,
  PayReadyEventProcessor,
  BirthdayEventProcessor,
} from './event-processor/event-processor.service';

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

  send_notification(notif: CreateNotificationDto): string[] {
    /**The dto content validation is build-in with 
    /*the app's PipeValidation and decorators used in the dto class
    **/

    // get content from database
    const company = this.companyDataService.getCompanyById(notif.companyId);
    const type = notif.notificationType;
    const userId = notif.userId;
    let results: string[] = [];

    // Pick the right processor
    switch (type) {
      case 'leave-balance-reminder': {
        const myLeaveEvent = new EndOfYearEventProcessor(
          this.notificationDataService,
        );
        results = results.concat(myLeaveEvent.run_event(company, userId, type));
        break;
      }
      case 'monthly-payslip': {
        const myPayEvent = new PayReadyEventProcessor();
        results = results.concat(myPayEvent.run_event(company, userId, type));
        break;
      }
      case 'happy-birthday': {
        const myBirthdayEvent = new BirthdayEventProcessor(
          this.notificationDataService,
        );
        results = results.concat(
          myBirthdayEvent.run_event(company, userId, type),
        );
        break;
      }
      default: {
        //Should never happened : Pipe is protecting this case in CreateNotificationDto
        this.throwBadRequestWithCause(
          `Notification type (${notif.notificationType}) not supported.`,
        );
      }
    }
    return results;
  }

  throwBadRequestWithCause(cause: string) {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: [cause],
        error: 'Bad request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
