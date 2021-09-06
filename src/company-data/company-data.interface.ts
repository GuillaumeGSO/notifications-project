export interface Company {
    companyId: string
    companyName: string;
    users: User[];
    subscribedNotificationTypes: NotificationTypeEnum[]
}

export interface User {
    userId: string;
    lastName: string;
    firstName: string;
    subscribedNotificationTypes: NotificationTypeEnum[]
}

export enum NotificationTypeEnum {
    LEAVE_BALANCE = "leave_balance_reminder",
    PAYSLIP = "monthly_payslip",
    BIRTHDAY = "happy_birthday",
}



