import { Company, User } from "src/company-data/company-data.interface";

abstract class Notification {
    content: string;
}

export class UINotification extends Notification {
    user: User;
}

export class EmailNotification extends Notification {
    company: Company;
    user: User;
}

export enum NotificationTypeEnum {
    LEAVE_BALANCE = "leave_balance_reminder",
    PAYSLIP = "monthly_payslip",
    BIRTHDAY = "happy_birthday",
}