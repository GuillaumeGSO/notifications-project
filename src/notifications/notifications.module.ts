import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CompanyDataModule } from 'src/company-data/company-data.module';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { NotificationDataModule } from 'src/notification-data/notification-data.module';
import { NotificationDataService } from 'src/notification-data/notification-data.service';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';
import { SenderService } from './sender/sender.service';

@Module({
  imports: [CompanyDataModule, NotificationDataModule],
  controllers: [NotificationsController],
  providers: [CompanyDataService, NotificationService],
})
export class NotificationsModule {}
