import { Injectable } from '@nestjs/common';
import { User, Company, NotificationTypeEnum } from './company-data.interface';

@Injectable()
export class CompanyDataService {

    find_all_notification_type(): NotificationTypeEnum[] {
        return [NotificationTypeEnum.BIRTHDAY, NotificationTypeEnum.LEAVE_BALANCE, NotificationTypeEnum.PAYSLIP]
    }

    get_company_by_id(companyId: string): Company {
        return {
            companyId: companyId,
            companyName: "CompanyName",
            users: [{
                userId: companyId + "01",
                lastName: "LASTNAME01",
                firstName: "first name01",
                subscribedNotificationTypes: [NotificationTypeEnum.BIRTHDAY]
            }, {
                userId: companyId + "02",
                lastName: "LASTNAME02",
                firstName: "first name02",
                subscribedNotificationTypes: [NotificationTypeEnum.LEAVE_BALANCE]
            }, {
                userId: companyId + "03",
                lastName: "LASTNAME03",
                firstName: "first name03",
                subscribedNotificationTypes: [NotificationTypeEnum.PAYSLIP]
            }, {
                userId: companyId + "04",
                lastName: "LASTNAME04",
                firstName: "first name04",
                subscribedNotificationTypes: [NotificationTypeEnum.BIRTHDAY, NotificationTypeEnum.LEAVE_BALANCE, NotificationTypeEnum.PAYSLIP]
            }, {
                userId: companyId + "05",
                lastName: "LASTNAME05",
                firstName: "first name05",
                subscribedNotificationTypes: [NotificationTypeEnum.BIRTHDAY, NotificationTypeEnum.LEAVE_BALANCE]
            }],
            subscribedNotificationTypes: [NotificationTypeEnum.PAYSLIP]
        }
    }

    get_user_by_id(userId): User {
        return {
            userId: userId,
            lastName: "LASTNAME",
            firstName: "first name",
            subscribedNotificationTypes: [NotificationTypeEnum.BIRTHDAY, NotificationTypeEnum.LEAVE_BALANCE]
        }
    }

}
