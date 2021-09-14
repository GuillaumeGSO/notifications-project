import { Module } from '@nestjs/common';
import { CompanyDataModule } from 'src/company-data/company-data.module';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { NotificationDataModule } from 'src/notification-data/notification-data.module';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  imports: [CompanyDataModule, NotificationDataModule],
  controllers: [NotificationsController],
  providers: [CompanyDataService, NotificationService],
})
export class NotificationsModule {}
