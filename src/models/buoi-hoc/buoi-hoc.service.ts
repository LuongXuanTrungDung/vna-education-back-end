import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bulkObjectID } from '../../helpers/utilities';
import { TietHocService } from '../tiet-hoc/tiet-hoc.service';
import { BuoiHocDto } from './buoi-hoc.dto';
import { BuoiHocDocument } from './buoi-hoc.entity';

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
        return this.model.find();
    }

    async findOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: BuoiHocDto) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    thu: dto.thu,
                    ngayHoc: dto.ngayHoc,
                },
                $push: { tietHoc: { $each: dto.tietHoc } },
            },
            { new: true },
        );
    }

    async remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
