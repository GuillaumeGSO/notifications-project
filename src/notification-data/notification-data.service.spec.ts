import { createMock } from '@golevelup/ts-jest';
import { ReturnModelType } from '@typegoose/typegoose';
import { resolve } from 'path/posix';
import { NotificationData } from './notification-data.model';
import { NotificationDataService } from './notification-data.service';

describe('NotificationDataService', () => {
  //Service to test
  let notificationDataService: NotificationDataService;

  it('should be defined',  () => {
    expect(notificationDataService).toBeDefined();
  });
  
  const mockDataModel = createMock<ReturnModelType<typeof NotificationData>>();
  notificationDataService = new NotificationDataService(mockDataModel);
  
  it ('should work with mocked service', async () => {
    //FIXME : the find method return a FilterQuery...not actual datas !
    //Should i mock the content of the model instead and let the query runs ?
    mockDataModel.find.mockResolvedValue( {userId:"1", type:"type1", content:"content1"});
    
    const result = await notificationDataService.get_notifications_for_user("1");
    expect(result).toMatchObject({userId:"1", type:"type1", content:"content1"})
  });

});

