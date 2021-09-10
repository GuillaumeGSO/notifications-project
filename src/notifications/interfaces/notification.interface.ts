import { Company, User } from "src/company-data/company-data.interface";

interface Notification {
    type: string;
    content: string;
}

export interface UINotification extends Notification {
    userId: string;
}

export interface EmailNotification extends Notification {
    company: Company;
    user: User;
}

export enum NotificationTypeEnum {
    LEAVE_BALANCE = "leave_balance_reminder",
    PAYSLIP = "monthly_payslip",
    BIRTHDAY = "happy_birthday",
}