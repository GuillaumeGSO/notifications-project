import { Company, User } from '../../company-data/company-data.interface';
import { NotificationDataService } from '../../notification-data/notification-data.service';

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
  ) {}

  content: Content;

  send(company: Company, user: User, type: string) {
    this.notificationDataService.create_ui_notification(
      user.userId,
      type,
      this.content.content,
    );
    return `New UI Notifiction ${type} added for ${user.firstName} ${user.lastName} of ${company.companyName}`;
  }
}

export class EmailNotificationStrategy implements INotificationStrategy {
  content: EmailContent;

  send(company: Company, user: User, type: string) {
    //This is where we should call a real email service
    console.log(
      `Sending a new email from ${company.companyName} to ${user.email} for ${type}`,
    );
    return `Email sent from ${company.companyName} to ${user.email} for ${type}`;
  }
}
