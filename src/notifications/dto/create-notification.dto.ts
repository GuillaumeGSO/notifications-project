import { IsIn, IsNotEmpty, IsString } from 'class-validator';

const notificationTypes = ['leave-balance-reminder', 'monthly-payslip', 'happy-birthday'];

export class CreateNotificationDto {

  @IsNotEmpty()
  @IsString()
  readonly companyId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(notificationTypes)
  readonly notificationType: string;
}
