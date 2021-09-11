import { Module } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CompanyDataService],
})
export class CompanyDataModule {}
