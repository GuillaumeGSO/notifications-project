import { SenderService } from './sender.service';
import {
  EmailNotificationStrategy,
  INotificationStrategy,
  UINotificationStrategy,
} from './sender.strategies';
import { createMock } from '@golevelup/ts-jest';
import {
  Company,
  User,
} from '../../company-data/company-data.interface';
import { getCompanyStub } from '../../company-data/company-data.stubs';

const monsterCompany: Company = getCompanyStub().find(
  (cp) => cp.companyId === '100',
);

describe('Call sender service with different strategies', () => {
  //Service to test
  let senderService: SenderService;

  describe('works with UINotificationStrategy', () => {
    const mockedStrategy = createMock<UINotificationStrategy>();
    mockedStrategy.send.mockReturnValue("Notification Sent !");
    senderService = new SenderService(mockedStrategy);

    it('should verifies that mock is ready', () => {
      expect(mockedStrategy).toBeDefined();
      expect(mockedStrategy.content).toBeDefined();
      expect(mockedStrategy.send).toBeDefined();
    })

    it('should call the strategy send method with no params', () => {
      mockedStrategy.send.mockReturnValue("Notification Sent !");
      const result = senderService.send_notification(
        undefined,
        undefined,
        undefined,
      );
      // expect(mockedStrategy.send).toBeCalledTimes(1);
      expect(mockedStrategy.send).toBeCalledWith(
        undefined,
        undefined,
        undefined,
      );
      expect(result).toEqual("Notification Sent !");
    });

    it('should call the strategy send method with params', () => {
      const result = senderService.send_notification(
        monsterCompany,
        monsterCompany.users[0],
        'leave_balance_reminder',
      );
      expect(mockedStrategy.send).toBeCalledWith(
        monsterCompany,
        monsterCompany.users[0],
        'leave_balance_reminder',
      );
      expect(result).toEqual("Notification Sent !");
    });
  });

  describe('works with EmailNotificationStrategy', () => {
    const mockedStrategy = createMock<EmailNotificationStrategy>();
    mockedStrategy.send.mockReturnValue("Email sent !")
    senderService = new SenderService(mockedStrategy);
    it('should call the strategy send method with no params', () => {
      const result = senderService.send_notification(
        undefined,
        undefined,
        undefined,
      );
      expect(mockedStrategy.send).toBeCalledWith(
        undefined,
        undefined,
        undefined,
      );
      expect(result).toEqual("Email sent !");
    });

    it('should call the strategy send method with params', () => {
      const result = senderService.send_notification(
        monsterCompany,
        monsterCompany.users[0],
        'leave_balance_reminder',
      );
      expect(mockedStrategy.send).toBeCalledWith(
        monsterCompany,
        monsterCompany.users[0],
        'leave_balance_reminder',
      );
      expect(result).toEqual("Email sent !");
    });
  });

  describe('works with any strategy', () => {

    //Fake strategy
    class DummyStrategy implements INotificationStrategy {
      content: Content;
      send(company: Company, user: User, type: string) {
        return 'This is a dummy strategy';
      }
    }
    const mockedStrategy = createMock<DummyStrategy>();
    mockedStrategy.send.mockReturnValue("Dummy sent !");
    senderService = new SenderService(mockedStrategy);
    it('should call the strategy send method with no params', () => {
      const result = senderService.send_notification(
        undefined,
        undefined,
        undefined,
      );
      expect(mockedStrategy.send).toBeCalledWith(
        undefined,
        undefined,
        undefined,
      );
      expect(result).toEqual("Dummy sent !");
    });

    it('should call the strategy send method with params', () => {
      const result = senderService.send_notification(
        monsterCompany,
        monsterCompany.users[0],
        'leave_balance_reminder',
      );
      expect(mockedStrategy.send).toBeCalledWith(
        monsterCompany,
        monsterCompany.users[0],
        'leave_balance_reminder',
      );
      expect(result).toEqual("Dummy sent !");
    });
  });
});
