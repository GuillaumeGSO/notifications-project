import { Module } from '@nestjs/common';
import { CompanyDataService } from './../company-data/company-data.service';

/**
 * This module would use a real EntrepriseDB connection instead of this mocked
 */

@Module({
  imports: [],
  controllers: [],
  providers: [CompanyDataService],
  exports: [CompanyDataService],
})
export class CompanyDataModule {}
