import { prop } from '@typegoose/typegoose';


export class NotificationData {
  @prop({ required: true })
  userID: string;
  @prop({ required: true })
  type: string;
  @prop()
  content: string;

}