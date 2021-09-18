import { Test, TestingModule } from '@nestjs/testing';
import { Company } from '../../company-data/company-data.interface';
import { EndOfYearEventProcessor, PayReadyEventProcessor, BirthdayEventProcessor } from './event-processor.service';



describe('PayReadyEventProcessor', () => {
  let service: PayReadyEventProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayReadyEventProcessor],
    }).compile();

    service = module.get<PayReadyEventProcessor>(PayReadyEventProcessor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


describe('EndOfYearEventProcessor', () => {
  let service: EndOfYearEventProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndOfYearEventProcessor],
    }).compile();

    service = module.get<EndOfYearEventProcessor>(EndOfYearEventProcessor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let company = {companyId :"1", companyName:"First", users: [], subscribedChannels:[]} as Company;
  
  it('should call the service', () => {
    expect(service.run_event(company, null, "unknown")).toBeDefined();
  });

});


describe('BirthdayEventProcessor', () => {
  let service: BirthdayEventProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BirthdayEventProcessor],
    }).compile();

    service = module.get<BirthdayEventProcessor>(BirthdayEventProcessor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});