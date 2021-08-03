import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assign } from '../../helpers/utilities';
import { TuanHocDto } from './tuan-hoc.dto';
import { TuanHoc, TuanHocDocument } from './tuan-hoc.entity';

@Injectable()
export class TuanHocService {
    constructor(
        @InjectModel('tuan_hoc') private model: Model<TuanHocDocument>,
    ) {}

    async create(dto: TuanHocDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        const all = await this.model.find();
        const result = [];
        for (let i = 0; i < all.length; i++) {
            result.push({
                id: all[i]._id,
                soTuan: all[i].soTuan,
                tenTuan: all[i].tenTuan,
                ngayBatDau: all[i].ngayBatDau,
                ngayKetThuc: all[i].ngayKetThuc,
                hocKy: all[i].hocKy,
            });
        }
        return result;
    }

    async findOne(id: string) {
        const tuan = await this.model.findById(id);
        return {
            id: tuan._id,
            soTuan: tuan.soTuan,
            tenTuan: tuan.tenTuan,
            ngayBatDau: tuan.ngayBatDau,
            ngayKetThuc: tuan.ngayKetThuc,
            hocKy: tuan.hocKy,
        };
    }

    async update(id: string, dto: TuanHocDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(dto, doc);
            await doc.save();
        });
    }

    async objectify(tuan: string) {
        return (await this.model.findById(tuan))._id;
    }

    async bulkObjectify(tuan: string[]) {
        const result = [];
        for (let i = 0; i < tuan.length; i++) {
            result.push(await this.objectify(tuan[i]));
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
