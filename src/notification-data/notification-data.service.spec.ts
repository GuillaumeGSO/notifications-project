import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDataService } from './notification-data.service';

describe('NotificationDataService', () => {
  let service: NotificationDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationDataService],
    }).compile();

    service = module.get<NotificationDataService>(NotificationDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
