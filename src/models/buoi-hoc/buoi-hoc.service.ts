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
            tuanHoc: Object(dto.tuanHoc),
        });
    }

    async findAll() {
        const all = await this.model
            .find()
            .populate({
                path: 'tuanHoc',
                select: [
                    'soTuan',
                    'tenTuan',
                    'ngayBatDau',
                    'ngayKetThuc',
                    'hocKy',
                ],
            })
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                thu: all[i].thu,
                ngayHoc: all[i].ngayHoc,
                tuanHoc: all[i].tuanHoc,
            });
        }
        return result;
    }

    async findOne(buoi: string) {
        const b = await (
            await this.model.findById(buoi)
        )
            .populate({
                path: 'tuanHoc',
                select: [
                    'soTuan',
                    'tenTuan',
                    'ngayBatDau',
                    'ngayKetThuc',
                    'hocKy',
                ],
            })
            .execPopulate();

        return {
            _id: buoi,
            thu: b.thu,
            ngayHoc: b.ngayHoc,
            tuanHoc: b.tuanHoc,
        };
    }

    async update(id: string, dto: BuoiHocDto) {
        const { tuanHoc, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (tuanHoc) doc.tuanHoc = Object(tuanHoc);
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
