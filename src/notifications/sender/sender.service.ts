import { Injectable } from '@nestjs/common';
import {
  Company,
  User,
} from 'src/company-data/company-data.interface';
import { INotificationStrategy } from './sender.strategies';




@Injectable()
export class SenderService {
  constructor(private readonly strategy: INotificationStrategy) {
    this.strategy = strategy;
  }

  send_notification(company: Company, user: User, type: string): string {
    return this.strategy.send(company, user, type);
  }
}
