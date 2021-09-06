import { Module } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationService, CompanyDataService],
})
export class NotificationsModule {}
