import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bulkObjectID } from '../../helpers/utilities';
import { BuoiHocService } from '../buoi-hoc/buoi-hoc.service';
import { CreateTuanHocDto } from './dto/create-tuan-hoc.dto';
import { UpdateTuanHocDto } from './dto/update-tuan-hoc.dto';
import { TuanHoc, TuanHocDocument } from './tuan-hoc.entity';

@Injectable()
export class TuanHocService {
    constructor(
        @InjectModel('tuan_hoc') private model: Model<TuanHocDocument>,
        private readonly bhSer: BuoiHocService,
    ) {}

    async create(dto: CreateTuanHocDto) {
        const { buoiHoc, ...rest } = dto;
        return await this.model.create({
            ...rest,
            buoiHoc: bulkObjectID(buoiHoc),
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

    async findOne(id: string | TuanHoc) {
        const tuan = await this.model.findById(id);
        const b = [];

        for (let i = 0; i < tuan.buoiHoc.length; i++) {
            b.push(await this.bhSer.findOne(tuan.buoiHoc[i]));
        }

        return {
            id: tuan._id,
            soTuan: tuan.soTuan,
            tenTuan: tuan.tenTuan,
            ngayBatDau: tuan.ngayBatDau,
            ngayKetThuc: tuan.ngayKetThuc,
            hocKy: tuan.hocKy,
            buoiHoc: b,
        };
    }

    async update(id: string, dto: UpdateTuanHocDto) {
        const { buoiHoc, ...rest } = dto;
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...rest,
                },
                $push: { buoiHoc: { $each: buoiHoc } },
            },
            { new: true },
        );
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
