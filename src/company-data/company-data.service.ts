import { Injectable } from '@nestjs/common';
import { User, Company, ChannelEnum } from './company-data.interface';

@Injectable()
export class CompanyDataService {

    find_all_channels(): string[] {
        return Object.keys(ChannelEnum)
    }

    get_company_by_id(companyId: string): Company {
        return {
            companyId: companyId,
            companyName: "CompanyName",
            users: [{
                userId: companyId + "01",
                lastName: "LASTNAME01",
                firstName: "first name01",
                email: "usr01@test.te",
                subscribedChannels: [ChannelEnum.EMAIL]
            }, {
                userId: companyId + "02",
                lastName: "LASTNAME02",
                firstName: "first name02",
                email: "usr02@test.te",
                subscribedChannels: [ChannelEnum.UI]
            }, {
                userId: companyId + "03",
                lastName: "LASTNAME03",
                firstName: "first name03",
                email: "usr03@test.te",
                subscribedChannels: [ChannelEnum.EMAIL, ChannelEnum.UI]
            }, {
                userId: companyId + "04",
                lastName: "LASTNAME04",
                firstName: "first name04",
                email: "usr04@test.te",
                subscribedChannels: []
            },],
            subscribedChannels: [ChannelEnum.EMAIL]
        }
    }

    get_user_by_id(userId: string): User {
        return {
            userId: userId,
            lastName: "LASTNAME",
            firstName: "first name",
            email: "lastname@test.te",
            subscribedChannels: [ChannelEnum.EMAIL, ChannelEnum.UI]
        }
    }

}
