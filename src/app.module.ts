import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { TypegooseModule } from 'nestjs-typegoose';
import config from './config/keys';

@Module({
  imports: [TypegooseModule.forRoot(config.mongoURI), NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
