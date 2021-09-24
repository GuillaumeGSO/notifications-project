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
  // Mock
  let mockedStrategy: INotificationStrategy;
  //Service to test
  let senderService: SenderService;

  //Fake strategy
  class DummyStrategy implements INotificationStrategy {
    content: Content;
    send(company: Company, user: User, type: string) {
      return 'This is a dummy strategy';
    }
  }

  describe('works with UINotificationStrategy', () => {
    mockedStrategy = createMock<UINotificationStrategy>(undefined, { name: 'UINotificationStrategy' });
    //mockedStrategy.send(undefined, undefined,undefined).mockReturnValueOnce("sent !")
    
    mockedStrategy.send = (company: Company, user: User, type: string) => {return "New UI notification sent !"}
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
      expect(result).toContain("sent !");
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
      expect(result).toEqual("sent !");
    });
  });

  describe('works with EmailNotificationStrategy', () => {
    mockedStrategy = createMock<EmailNotificationStrategy>();
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
      expect(result).toEqual("sent !");
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
      expect(result).toEqual("sent !");
    });
  });

  describe('works with any strategy', () => {
    mockedStrategy = createMock<DummyStrategy>();
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
      expect(result).toEqual("sent !");
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
    });
  });
});
