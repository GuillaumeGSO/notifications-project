import { prop } from '@typegoose/typegoose';

export class NotificationData {
  @prop({ required: true })
  userId: string;
  @prop({ required: true })
  type: string;
  @prop()
  content: string;
}
