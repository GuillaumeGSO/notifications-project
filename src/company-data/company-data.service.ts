import { Injectable } from '@nestjs/common';
import { User, Company, ChannelEnum } from './company-data.interface';
/**
 * Mocked Company data service
 */
@Injectable()
export class CompanyDataService {
  users: User[] = [
    //For MonsterINC company
    this.generateUser("0", "Bob", "WARWOSKY", "bob@monster.inc", [ChannelEnum.EMAIL, ChannelEnum.UI]),
    this.generateUser("1", "Fred", "WARWOSKY", "fred@monster.inc", [ChannelEnum.EMAIL]),
    this.generateUser("2", "Tom", "WARWOSKY", "tom@monster.inc", [ChannelEnum.UI]),
    this.generateUser("3", "John", "WARWOSKY", "john@monster.inc", []),

    //For DALTON sarl company
    this.generateUser("10", "Joe", "DALTON", "joe@dalton.com", [ChannelEnum.EMAIL, ChannelEnum.UI]),
    this.generateUser("11", "Jack", "DALTON", "jack@dalton.com", [ChannelEnum.EMAIL]),
    this.generateUser("12", "William", "DALTON", "william@dalton.com", [ChannelEnum.UI]),
    this.generateUser("13", "Avrel", "DALTON", "avrel@dalton.com", []),

    //For The Simpson's company
    this.generateUser("20", "Bart", "SIMPSON", "bart@simpsons.com", [ChannelEnum.EMAIL, ChannelEnum.UI]),
    this.generateUser("21", "Homer", "SIMPSON", "homer@simpsons.com", [ChannelEnum.EMAIL]),
    this.generateUser("22", "Marge", "SIMPSON", "Marge@simpsons.com", [ChannelEnum.UI]),
    this.generateUser("23", "Lisa", "SIMPSON", "lisa@simpsons.com", [])
  ]
  companies: Company[] = [
    this.generateCompany("100", "EMPTY", [], [ChannelEnum.EMAIL, ChannelEnum.UI]),
    this.generateCompany("200", "MONSTER Inc",
      [
        this.getUserById("0"),
        this.getUserById("1"),
        this.getUserById("2"),
        this.getUserById("3")
      ],
      [ChannelEnum.EMAIL, ChannelEnum.UI]),
    this.generateCompany("300", "DALTON Sarl", 
    [
      this.getUserById("10"),
      this.getUserById("11"),
      this.getUserById("12"),
      this.getUserById("13")
    ], 
    [ChannelEnum.EMAIL]),
    this.generateCompany("400", "THE SIMPSON'S", 
    [
      this.getUserById("20"),
      this.getUserById("21"),
      this.getUserById("22"),
      this.getUserById("23")
    ], [ChannelEnum.UI]),

  ]

  getCompanyById(companyId: string): Company {
    return this.companies.find((cp) => (cp.companyId === companyId))
  }

  getUserById(userId: string): User {
    return this.users.find((us) => (us.userId === userId))
  }

  generateCompany(companyId: string, companyName: string, users: User[], channels: ChannelEnum[]): Company {
    return {
      companyId: companyId,
      companyName: companyName,
      users: users, subscribedChannels: channels
    } as Company
  }
  generateUser(userId: string, firstName: string, lastName: string, email: string, channelEnums: ChannelEnum[]): User {
    return {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      subscribedChannels: channelEnums
    } as User
  }
}
