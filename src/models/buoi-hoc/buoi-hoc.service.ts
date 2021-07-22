import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bulkObjectID } from '../../helpers/utilities';
import { TietHocService } from '../tiet-hoc/tiet-hoc.service';
import { BuoiHocDto } from './buoi-hoc.dto';
import { BuoiHoc, BuoiHocDocument } from './buoi-hoc.entity';

@Injectable()
export class BuoiHocService {
    constructor(
        @InjectModel('buoi_hoc') private model: Model<BuoiHocDocument>,
        private readonly thSer: TietHocService,
    ) {}

    async create(dto: BuoiHocDto) {
        return await this.model.create({
            thu: dto.thu,
            ngayHoc: dto.ngayHoc,
            tietHoc: bulkObjectID(dto.tietHoc),
        });
    }

    async findAll() {
        const all = await this.model.find({});
        const result = [];
        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne(all[i]._id));
        }
        return result;
    }

    async findOne(buoi: string | BuoiHoc) {
        const b = await this.model.findById(buoi);
        const t = [];

        for (let i = 0; i < b.tietHoc.length; i++) {
            t.push(await this.thSer.findOne(b.tietHoc[i]));
        }

        return {
            id: buoi,
            thu: b.thu,
            ngayHoc: b.ngayHoc,
            tietHoc: t,
        };
    }

    async update(id: string, dto: BuoiHocDto) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    thu: dto.thu,
                    ngayHoc: dto.ngayHoc,
                    tietHoc: await this.thSer.bulkObjectify(dto.tietHoc),
                },
            },
            { new: true },
        );
    }

    async remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
