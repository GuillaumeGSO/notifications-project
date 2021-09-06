import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationService } from './notifications/notifications.service';
import { CompanyDataService } from './company-data/company-data.service';

@Module({
  imports: [],
  controllers: [AppController, NotificationsController],
  providers: [AppService, NotificationService, CompanyDataService],
})
export class AppModule {}
