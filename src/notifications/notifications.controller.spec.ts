import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  const mocked = {
    get_user_ui_notifications: jest.fn().mockReturnValue([]),
    send_notification: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationService],
    })
      .overrideProvider(NotificationService)
      .useValue(mocked)
      .compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it ('should get notification for a user', ()=>{
  //   expect(controller.get_user_ui_notifications('123'))
  //   .toEqual([]);
  //   expect(mocked.get_user_ui_notifications).toHaveBeenCalled();
  // });
});
