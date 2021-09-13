import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notifications.service';
import { NotificationData } from './services/notifications-data.model';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':id')
  async get_user_ui_notifications(
    @Param('id') id,
  ): Promise<NotificationData[]> {
    return await this.notificationService.get_notifications_for_user(id);
  }

  @Post()
  send_notifications(
    @Body() createNotificationDto: CreateNotificationDto,
  ): string[] {
    return this.notificationService.send_notification(createNotificationDto);
  }
}
