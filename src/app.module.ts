import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { CompanyDataModule } from './company-data/company-data.module';
import { TypegooseModule } from 'nestjs-typegoose';
import config from './config/keys'

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongoURI), CompanyDataModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
