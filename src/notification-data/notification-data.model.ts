import { prop } from '@typegoose/typegoose';
/**
 * Define the UI notifications in the mongoDB
 */
export class NotificationData {
  @prop({ required: true })
  userId: string;
  @prop({ required: true })
  type: string;
  @prop()
  content: string;
}
