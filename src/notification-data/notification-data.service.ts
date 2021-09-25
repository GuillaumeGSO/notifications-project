import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { NotificationData } from './notification-data.model';

@Injectable()
export class NotificationDataService {
  constructor(
    @InjectModel(NotificationData)
    private readonly notificationDataModel: ReturnModelType<
      typeof NotificationData
    >,
  ) {}

  async get_notifications_for_user(
    userId: string,
  ): Promise<NotificationData[]> {
    const notifs = await this.notificationDataModel
      .find({ userId: userId });
    return notifs;
  }

  async create_ui_notification(
    userId: string,
    typeNotif: string,
    content: string,
  ): Promise<NotificationData> {
    const newnot = new this.notificationDataModel({
      userId: userId,
      type: typeNotif,
      content: content,
    });
    await newnot.save();
    return newnot;
  }
}
