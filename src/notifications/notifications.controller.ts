import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notifications.service';
import { UINotification } from './interfaces/notification.interface';

@Controller('notifications')
export class NotificationsController {
    constructor( private readonly companyService: CompanyDataService,
                    private readonly notificationService: NotificationService) { }

    @Get(':id')
    get_user_ui_notifications(@Param('id') id) : UINotification[]{
        return this.notificationService.get_notifications_for_user(id)
    }

    @Post()
    send_notifications(@Body() createNotificationDto: CreateNotificationDto): string {
        return `create ${createNotificationDto.companyId} - ${createNotificationDto.notificationType}`
    }
}
