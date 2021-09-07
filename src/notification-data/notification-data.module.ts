import { Module } from '@nestjs/common';
import { NotificationDataService } from 'src/notification-data/notification-data.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationDataService],
})
export class NotificationDataModule {}
