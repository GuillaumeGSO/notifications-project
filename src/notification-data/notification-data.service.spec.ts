import { createMock } from '@golevelup/ts-jest';
import { ReturnModelType } from '@typegoose/typegoose';
import { resolve } from 'path/posix';
import { NotificationData } from './notification-data.model';
import { NotificationDataService } from './notification-data.service';

describe('NotificationDataService', () => {
  //Service to test
  let notificationDataService: NotificationDataService;

beforeEach( () => {
  const mockDataModel = createMock<ReturnModelType<typeof NotificationData>>();
  notificationDataService = new NotificationDataService(mockDataModel);
})

  it('should be defined',  () => {
    expect(notificationDataService).toBeDefined();
    expect(notificationDataService.create_ui_notification).toBeDefined();
    expect(notificationDataService.get_notifications_for_user).toBeDefined();
  });

  
  /** 
  it('should verify the mock is ready', async () => {
    await notificationDataService.create_ui_notification("1", "type", "content");
    await notificationDataService.get_notifications_for_user("1");
  });
  */

  
});

