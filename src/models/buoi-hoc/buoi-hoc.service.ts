import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign } from '../../helpers/utilities';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { BuoiHocDto } from './buoi-hoc.dto';
import { BuoiHoc, BuoiHocDocument } from './buoi-hoc.entity';

@Injectable()
export class BuoiHocService {
    constructor(
        @InjectModel('buoi_hoc') private model: Model<BuoiHocDocument>,
        private readonly tuanSer: TuanHocService,
    ) {}

    async create(dto: BuoiHocDto) {
        return await this.model.create({
            thu: dto.thu,
            ngayHoc: dto.ngayHoc,
            tuanHoc: Types.ObjectId(dto.tuanHoc),
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
        return {
            id: buoi,
            thu: b.thu,
            ngayHoc: b.ngayHoc,
            tuanHoc: (await this.tuanSer.findOne(b.tuanHoc)).soTuan,
        };
    }

    async update(id: string, dto: BuoiHocDto) {
        const { tuanHoc, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (tuanHoc) doc.tuanHoc = await this.tuanSer.objectify(tuanHoc);
            await doc.save();
        });
    }

    async objectify(buoi: string) {
        return (await this.model.findById(buoi))._id;
    }

    async remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
