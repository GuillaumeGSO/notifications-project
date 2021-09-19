import { Test, TestingModule } from '@nestjs/testing';
import {
  EmailNotificationStrategy,
  UINotificationStrategy,
} from './sender.strategies';

describe('UINotificationStrategy', () => {
  let service: UINotificationStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UINotificationStrategy],
    }).compile();

    service = module.get<UINotificationStrategy>(UINotificationStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('EmailNotificationStrategy', () => {
  let service: EmailNotificationStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailNotificationStrategy],
    }).compile();

    service = module.get<EmailNotificationStrategy>(EmailNotificationStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
