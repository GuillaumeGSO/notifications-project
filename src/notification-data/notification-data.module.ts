import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificationData } from './notification-data.model';
import { NotificationDataService } from './notification-data.service';

/**
 * This module would use a real EntrepriseDB connection instead of this mocked
 */
@Module({
  imports: [TypegooseModule.forFeature([NotificationData])],
  controllers: [],
  providers: [NotificationDataService],
  exports: [NotificationDataService],
})
export class NotificationDataModule {}
