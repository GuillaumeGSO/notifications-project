import { User, Company, ChannelEnum } from './company-data.interface';

/** This generate a dataset of companies and users to
/* be used during unit testing and mocked service
**/
export const getCompanyStub = (): Company[] => {
  return companies;
};

const users4Monster: User[] = [
  //For MonsterINC company
  generateUser('10', 'Bob', 'WARWOSKY', 'bob@monster.inc', [
    ChannelEnum.EMAIL,
    ChannelEnum.UI,
  ]),
  generateUser('11', 'Fred', 'WARWOSKY', 'fred@monster.inc', [
    ChannelEnum.EMAIL,
  ]),
  generateUser('12', 'Tom', 'WARWOSKY', 'tom@monster.inc', [ChannelEnum.UI]),
  generateUser('13', 'John', 'WARWOSKY', 'john@monster.inc', []),
];

const users4Dalton: User[] = [
  //For DALTON sarl company
  generateUser('20', 'Joe', 'DALTON', 'joe@dalton.com', [
    ChannelEnum.EMAIL,
    ChannelEnum.UI,
  ]),
  generateUser('21', 'Jack', 'DALTON', 'jack@dalton.com', [ChannelEnum.EMAIL]),
  generateUser('22', 'William', 'DALTON', 'william@dalton.com', [
    ChannelEnum.UI,
  ]),
  generateUser('23', 'Avrel', 'DALTON', 'avrel@dalton.com', []),
];

const users4Simpsons: User[] = [
  //For The Simpson's company
  generateUser('30', 'Bart', 'SIMPSON', 'bart@simpsons.com', [
    ChannelEnum.EMAIL,
    ChannelEnum.UI,
  ]),
  generateUser('31', 'Homer', 'SIMPSON', 'homer@simpsons.com', [
    ChannelEnum.EMAIL,
  ]),
  generateUser('32', 'Marge', 'SIMPSON', 'Marge@simpsons.com', [
    ChannelEnum.UI,
  ]),
  generateUser('33', 'Lisa', 'SIMPSON', 'lisa@simpsons.com', []),
];

const users4Heroes: User[] = [
  //For The Simpson's company
  generateUser('40', 'Captain', 'AMERICA', 'captain@heroes.com', [
    ChannelEnum.EMAIL,
    ChannelEnum.UI,
  ]),
  generateUser('41', 'Peter', 'SPIDERMAN', 'peter@heroes.com', [
    ChannelEnum.EMAIL,
  ]),
  generateUser('42', 'Clark', 'SUPERMAN', 'clark@heroes.com', [ChannelEnum.UI]),
  generateUser('43', 'Cat', 'WOMAN', 'cat@heroes.com', []),
];

const companies: Company[] = [
  generateCompany('000', 'EMPTY', [], [ChannelEnum.EMAIL, ChannelEnum.UI]),

  generateCompany('100', 'MONSTER Inc', users4Monster, [
    ChannelEnum.EMAIL,
    ChannelEnum.UI,
  ]),

  generateCompany('200', 'DALTON Sarl', users4Dalton, [ChannelEnum.EMAIL]),

  generateCompany('300', "THE SIMPSON'S", users4Simpsons, [ChannelEnum.UI]),

  generateCompany('400', 'MARVEL', users4Heroes, []),
];

function generateCompany(
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

function generateUser(
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
