import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { NotificationData } from './notifications-data.model';

@Injectable()
export class NotificationDataService {

    constructor(
        @InjectModel(NotificationData)
        private readonly notificationDataModel: ReturnModelType<typeof NotificationData>
    ) { }

    async get_notifications_for_user(userId: string): Promise<NotificationData[]> {
        return await this.notificationDataModel.find().exec();
    }

    get_notifications_for_user_old(userId: string): any[] {
        return [{ userId: 'userId1', content: 'notif1' }, { userId: 'userId2', content: "notif3" }, { userId: 'userId3', content: "notif3" }]
    }

}
