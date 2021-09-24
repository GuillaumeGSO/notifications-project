import { SenderService } from './sender.service';
import {
  EmailNotificationStrategy,
  INotificationStrategy,
  UINotificationStrategy,
} from './sender.strategies';
import { createMock } from '@golevelup/ts-jest';
import {
  ChannelEnum,
  Company,
  User,
} from '../../company-data/company-data.interface';
import { getCompanyStub } from '../../company-data/company-data.stubs';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { NotificationDataService } from 'src/notification-data/notification-data.service';

const monsterCompany: Company = getCompanyStub().find(
  (cp) => cp.companyId === '100',
);

describe('Calling Email strategy', () => {
  //Service to test
  let strategy: EmailNotificationStrategy;

  describe('send email notification', () => {
    strategy = new EmailNotificationStrategy();
    const emailContent = {
      address: 'test@test.com',
      object: 'subject',
      body: 'body content',
    } as EmailContent;
    strategy.content = emailContent;

    it('should generate the complete email', () => {
      const result = strategy.send(
        monsterCompany,
        monsterCompany.users[0],
        'any_event',
      );
      expect(result).toContain(monsterCompany.companyName);
      expect(result).toContain('test@test.com');
      expect(result).toContain('any_event');
      expect(result).toContain(emailContent.body);
    });

    it('should work with no company', () => {
      const result = strategy.send(
        undefined,
        monsterCompany.users[0],
        'any_event',
      );
      expect(result).toContain('undefined');
      expect(result).toContain('test@test.com');
      expect(result).toContain('any_event');
      expect(result).toContain(emailContent.body);
    });

    it('should work with no user', () => {
      const result = strategy.send(undefined, undefined, 'any_event');
      expect(result).toContain('undefined');
      expect(result).toContain('test@test.com');
      expect(result).toContain('any_event');
      expect(result).toContain(emailContent.body);
    });

    it('should work with no type', () => {
      const result = strategy.send(undefined, undefined, undefined);
      expect(result).toContain(
        'Email sent from undefined to test@test.com for undefined',
      );
      expect(result).toContain(emailContent.body);
    });

    it('should work with nothing', () => {
      emailContent.body = undefined;
      emailContent.address = undefined;
      const result = strategy.send(undefined, undefined, undefined);
      expect(result).toContain(
        'Email sent from undefined to undefined for undefined : undefined',
      );
    });
  });
});

describe('Calling UI Notification strategy', () => {
  //Service to test
  let strategy: UINotificationStrategy;

  //Mock
  let notificationDataService: NotificationDataService;

  describe('send email notification', () => {
    notificationDataService = createMock<NotificationDataService>();
    strategy = new UINotificationStrategy(notificationDataService);
    const content = { content: 'new UI content' } as Content;
    strategy.content = content;

    it('should generate a full new UI Notification', () => {
      const result = strategy.send(
        monsterCompany,
        monsterCompany.users[1],
        'any_event',
      );
      expect(notificationDataService.create_ui_notification).toBeCalledWith(
        '11',
        'any_event',
        'new UI content',
      );
      expect(result).toContain(
        'New UI Notification any_event added for Fred WARWOSKY of MONSTER Inc : new UI content',
      );
    });

    it('should work with no company', () => {
      const result = strategy.send(
        undefined,
        monsterCompany.users[1],
        'any_event',
      );
      expect(notificationDataService.create_ui_notification).toBeCalledWith(
        '11',
        'any_event',
        'new UI content',
      );
      expect(result).toContain(
        'New UI Notification any_event added for Fred WARWOSKY of undefined : new UI content',
      );
    });

    it('should work with no user', () => {
      const result = strategy.send(undefined, undefined, 'any_event');
      //The mock should throw an exception because of class validators in the notificationModel
      expect(notificationDataService.create_ui_notification).toBeCalledWith(
        undefined,
        'any_event',
        'new UI content',
      );
      expect(result).toContain(
        'New UI Notification any_event added for undefined undefined of undefined : new UI content',
      );
    });

    it('should work with no type', () => {
      const result = strategy.send(undefined, undefined, undefined);
      //The mock should throw an exception because of class validators in the notificationModel
      expect(notificationDataService.create_ui_notification).toBeCalledWith(
        undefined,
        undefined,
        'new UI content',
      );
      expect(result).toContain(
        'New UI Notification undefined added for undefined undefined of undefined : new UI content',
      );
    });

    it('should work with nothing', () => {
      strategy.content = undefined;
      const result = strategy.send(undefined, undefined, undefined);
      //The mock should throw an exception because of class validators in the notificationModel
      expect(notificationDataService.create_ui_notification).toBeCalledWith(
        undefined,
        undefined,
        undefined,
      );
      expect(result).toContain(
        'New UI Notification undefined added for undefined undefined of undefined : undefined',
      );
    });
  });
});
