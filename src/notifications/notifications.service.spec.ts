import { Test, TestingModule } from '@nestjs/testing';
import {
  ChannelEnum,
  User,
  Company,
} from '../company-data/company-data.interface';
import { CompanyDataService } from '../company-data/company-data.service';
import { NotificationDataService } from '../notification-data/notification-data.service';
import { NotificationService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationService;

  const mockedCompanyDataService = {
    getCompanyById: jest
      .fn()
      .mockReturnValue(generateCompany('1', 'FirstCompany', [], [])),
  };
  const mockedNotificationDataService = {
    get_notifications_for_user: jest.fn().mockReturnValue([]),
    send_notification: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        CompanyDataService,
        NotificationDataService,
      ],
    })
      .overrideProvider(CompanyDataService)
      .useValue(mockedCompanyDataService)
      .overrideProvider(NotificationDataService)
      .useValue(mockedNotificationDataService)
      .compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

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
