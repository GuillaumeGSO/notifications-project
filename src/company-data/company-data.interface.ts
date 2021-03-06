/**
 * Those interfaces represent what the "Entreprise DB" would be
 */

export interface Company {
  companyId: string;
  companyName: string;
  users: User[];
  subscribedChannels: ChannelEnum[];
}

export interface User {
  userId: string;
  lastName: string;
  firstName: string;
  email: string;
  subscribedChannels: ChannelEnum[];
}

export enum ChannelEnum {
  EMAIL = 'EMAIL',
  UI = 'UI',
}
