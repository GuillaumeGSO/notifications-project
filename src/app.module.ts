import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationService } from './notifications/notifications.service';
import { CompanyDataService } from './company-data/company-data.service';
import { NotificationDataService } from './notifications/services/notifications-data.service';
import { NotificationsModule } from './notifications/notifications.module';
import { CompanyDataModule } from './company-data/company-data.module';
import { TypegooseModule } from 'nestjs-typegoose';
import config from './config/keys'
import { NotificationData } from './notifications/services/notifications-data.model';

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongoURI), CompanyDataModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
