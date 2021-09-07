import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationService } from './notifications/notifications.service';
import { CompanyDataService } from './company-data/company-data.service';
import { NotificationDataService } from './notification-data/notification-data.service';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationDataModule } from './notification-data/notification-data.module';
import { CompanyDataModule } from './company-data/company-data.module';

@Module({
  imports: [NotificationsModule, NotificationDataModule, CompanyDataModule],
  controllers: [AppController, NotificationsController],
  providers: [AppService, NotificationService, CompanyDataService, NotificationDataService],
})
export class AppModule {}
