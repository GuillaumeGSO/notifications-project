import { Injectable } from '@nestjs/common';
import { Company } from './company-data.interface';
import { getCompanyStub } from './company-data.stubs';
/**
 * Mocked Company data service
 */
@Injectable()
export class CompanyDataService {
  getCompanyById(companyId: string): Company {
    return getCompanyStub().find((cp) => cp.companyId === companyId);
  }
}
