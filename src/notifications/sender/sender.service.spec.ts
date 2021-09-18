import { Test, TestingModule } from '@nestjs/testing';
import { SenderService } from './sender.service';
import { UINotificationStrategy } from './sender.strategies';

describe('SenderService', () => {
  let service: SenderService;

  const mockedStrategy = {
    send_notification: jest.fn().mockReturnValue(
      "Notification sent")
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SenderService,
      {
        provide : UINotificationStrategy,
        useValue : mockedStrategy
      }],
    }).compile();

    service = module.get<SenderService>(SenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
