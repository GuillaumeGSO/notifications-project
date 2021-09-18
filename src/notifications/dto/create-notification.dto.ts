import { IsIn, IsNotEmpty } from 'class-validator';

const notificationTypes =['leave-balance-reminder', 'monthly-payslip', 'happy-birthday'];

export class CreateNotificationDto {
  @IsNotEmpty()
  readonly companyId: string;

  readonly userId: string;

  @IsNotEmpty()
  @IsIn(notificationTypes)
  readonly notificationType: string;
}
