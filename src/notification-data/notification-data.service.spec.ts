import { Test, TestingModule } from '@nestjs/testing';
import { NotificationData } from './notification-data.model';
import { NotificationDataService } from './notification-data.service';

describe('NotificationDataService', () => {
  let service: NotificationDataService;

  // const mockedNotificationData = {};

  beforeEach(async () => {
    // const mock = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationDataService,
        {
          provide: NotificationData,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NotificationDataService>(NotificationDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
