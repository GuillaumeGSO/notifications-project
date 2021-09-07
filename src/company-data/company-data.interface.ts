//TODO add typegoose that allows decorators for types

export interface Company {
    companyId: string
    companyName: string;
    users: User[];
    subscribedChannels: ChannelEnum[]
}

export interface User {
    userId: string;
    lastName: string;
    firstName: string;
    email: string;
    subscribedChannels: ChannelEnum[]
}

export enum ChannelEnum {
    EMAIL,
    UI,
}



