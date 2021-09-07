import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationDataService {
    get_notifications_for_user(userId: string): any[] {
        return [{ userId: 'userId1', content: 'notif1' }, { userId: 'userId2', content: "notif3" }, { userId: 'userId3', content: "notif3" }]
    }
}
