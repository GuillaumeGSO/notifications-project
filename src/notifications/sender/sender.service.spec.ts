import { createMock } from '@golevelup/ts-jest';
import { SenderService } from './sender.service';
import {
  INotificationStrategy
} from './sender.strategies';

describe('Call sender service with different strategies', () => {
  //Service to test
  let senderService: SenderService;
  let strategy: INotificationStrategy;

  beforeEach(() => {
    // before each test (it .... ), this is executed so you can reset your mocks
    strategy = createMock<INotificationStrategy>();
    strategy.send = () => {
      return "Notification Sent !"
    };
    senderService = new SenderService(strategy);
  })
  describe('works with an interface', () => {
    it('should verifies that mock is ready', () => {
      expect(strategy).toBeDefined();
      expect(strategy.content).toBeDefined();
      expect(strategy.send).toBeDefined();
    })
    it('should call the strategy', () => {
      const result = senderService.send_notification(
        undefined,
        undefined,
        undefined,
      );
      expect(strategy.send).toBeCalled();
      expect(result).toEqual("Notification Sent !");
    });
  });
});