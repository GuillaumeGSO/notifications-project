import { Injectable } from '@nestjs/common';
import { User, Company, ChannelEnum } from './company-data.interface';
/**
 * Mocked Company data service
 */
@Injectable()
export class CompanyDataService {
  private users4Monster: User[] = [
    //For MonsterINC company
    this.generateUser('0', 'Bob', 'WARWOSKY', 'bob@monster.inc', [
      ChannelEnum.EMAIL,
      ChannelEnum.UI,
    ]),
    this.generateUser('1', 'Fred', 'WARWOSKY', 'fred@monster.inc', [
      ChannelEnum.EMAIL,
    ]),
    this.generateUser('2', 'Tom', 'WARWOSKY', 'tom@monster.inc', [
      ChannelEnum.UI,
    ]),
    this.generateUser('3', 'John', 'WARWOSKY', 'john@monster.inc', []),
  ];
  private users4Dalton: User[] = [
    //For DALTON sarl company
    this.generateUser('10', 'Joe', 'DALTON', 'joe@dalton.com', [
      ChannelEnum.EMAIL,
      ChannelEnum.UI,
    ]),
    this.generateUser('11', 'Jack', 'DALTON', 'jack@dalton.com', [
      ChannelEnum.EMAIL,
    ]),
    this.generateUser('12', 'William', 'DALTON', 'william@dalton.com', [
      ChannelEnum.UI,
    ]),
    this.generateUser('13', 'Avrel', 'DALTON', 'avrel@dalton.com', []),
  ];
  private users4Simpsons: User[] = [
    //For The Simpson's company
    this.generateUser('20', 'Bart', 'SIMPSON', 'bart@simpsons.com', [
      ChannelEnum.EMAIL,
      ChannelEnum.UI,
    ]),
    this.generateUser('21', 'Homer', 'SIMPSON', 'homer@simpsons.com', [
      ChannelEnum.EMAIL,
    ]),
    this.generateUser('22', 'Marge', 'SIMPSON', 'Marge@simpsons.com', [
      ChannelEnum.UI,
    ]),
    this.generateUser('23', 'Lisa', 'SIMPSON', 'lisa@simpsons.com', []),
  ];

  private companies: Company[] = [
    this.generateCompany(
      '100',
      'EMPTY',
      [],
      [ChannelEnum.EMAIL, ChannelEnum.UI],
    ),

    this.generateCompany('200', 'MONSTER Inc', this.users4Monster, [
      ChannelEnum.EMAIL,
      ChannelEnum.UI,
    ]),

    this.generateCompany('300', 'DALTON Sarl', this.users4Monster, [
      ChannelEnum.EMAIL,
    ]),

    this.generateCompany('400', "THE SIMPSON'S", this.users4Simpsons, [
      ChannelEnum.UI,
    ]),
  ];

  getCompanyById(companyId: string): Company {
    return this.companies.find((cp) => cp.companyId === companyId);
  }

  private generateCompany(
    companyId: string,
    companyName: string,
    users: User[],
    channels: ChannelEnum[],
  ): Company {
    return {
      companyId: companyId,
      companyName: companyName,
      users: users,
      subscribedChannels: channels,
    } as Company;
  }

  private generateUser(
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    channelEnums: ChannelEnum[],
  ): User {
    return {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      subscribedChannels: channelEnums,
    } as User;
  }
}
