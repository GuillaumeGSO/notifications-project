import { Injectable } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { UINotification } from './interfaces/notification.interface';


@Injectable()
export class NotificationService {
    constructor(private readonly companyDataService: CompanyDataService) {}

    get_notifications_for_user(userId : string): UINotification[] {
        return [{content: "notif1"}, {content: "notif2"}, {content: "notif3"}, {content: "notif longue"}]
    }
}
