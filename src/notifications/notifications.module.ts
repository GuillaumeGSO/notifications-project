import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CompanyDataModule } from 'src/company-data/company-data.module';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { NotificationDataService } from 'src/notifications/services/notifications-data.service';
import { NotificationsController } from './notifications.controller';
import { NotificationData } from './services/notifications-data.model';
import { NotificationService } from './notifications.service';

@Module({
  imports: [CompanyDataModule, TypegooseModule.forFeature([NotificationData])],
  controllers: [NotificationsController],
  providers: [CompanyDataService, NotificationDataService, NotificationService],
})
export class NotificationsModule {}
