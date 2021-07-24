import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign, bulkObjectID } from '../../helpers/utilities';
import { TietHocService } from '../tiet-hoc/tiet-hoc.service';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { CreateBuoiHocDto } from './dto/create-buoi-hoc.dto';
import { BuoiHoc, BuoiHocDocument } from './buoi-hoc.entity';
import { UpdateBuoiHocDto } from './dto/update-buoi-hoc.dto';

@Injectable()
export class BuoiHocService {
    constructor(
        @InjectModel('buoi_hoc') private model: Model<BuoiHocDocument>,
        private readonly thSer: TietHocService,
        private readonly tuanSer: TuanHocService,
    ) {}

    async create(dto: CreateBuoiHocDto) {
        return await this.model.create({
            thu: dto.thu,
            ngayHoc: dto.ngayHoc,
            tietHoc: [],
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
        const t = [];

        if (b.tietHoc) {
            for (let i = 0; i < b.tietHoc.length; i++) {
                t.push(await this.thSer.findOne(b.tietHoc[i]));
            }
        }

        return {
            id: buoi,
            thu: b.thu,
            ngayHoc: b.ngayHoc,
            tuanHoc: (await this.tuanSer.findOne(b.tuanHoc)).soTuan,
            tietHoc: t,
        };
    }

    async update(id: string, dto: UpdateBuoiHocDto) {
        const { tietHoc, tuanHoc, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (tietHoc) doc.tietHoc = await this.thSer.bulkObjectify(tietHoc);
            if (tuanHoc) doc.tuanHoc = await this.tuanSer.objectify(tuanHoc);
            await doc.save();
        });
    }

    async addClass(id: string, classe: string[]) {
        return await this.model.findByIdAndUpdate(
            id,
            { $push: { tietHoc: { $each: classe } } },
            { new: true },
        );
    }

    async remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
