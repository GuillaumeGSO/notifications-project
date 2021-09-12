import { IsNotEmpty } from 'class-validator'

export class CreateNotificationDto {
  @IsNotEmpty()
  readonly companyId: string;

  readonly userId: string;
  
  @IsNotEmpty()
  readonly notificationType: string;
}
