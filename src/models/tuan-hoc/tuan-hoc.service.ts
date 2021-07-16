import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HocKyService } from '../hoc-ky/hoc-ky.service';
import { CreateTuanHocDto } from './dto/create-tuan-hoc.dto';
import { UpdateTuanHocDto } from './dto/update-tuan-hoc.dto';
import { TuanHocDocument } from './tuan-hoc.entity';

@Injectable()
export class TuanHocService {
    constructor(
        @InjectModel('tuan_hoc') private model: Model<TuanHocDocument>,
        private readonly hkSer: HocKyService,
    ) {}

    async create(dto: CreateTuanHocDto) {
        const { hocKy, ...rest } = dto;
        return await this.model.create({
            ...rest,
            hocKy: Types.ObjectId(hocKy),
        });
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        const tuan = await (
            await this.model.findById(id)
        )
            .populate({
                path: 'hocKy',
                model: 'hoc_ky',
            })
            .execPopulate();

        return {
            id: tuan._id,
            soTuan: tuan.soTuan,
            tenTuan: tuan.tenTuan,
            ngayBatDau: tuan.ngayBatDau,
            ngayKetThuc: tuan.ngayKetThuc,
            hocKy: tuan.hocKy.tenHK,
        };
    }

    async update(id: string, dto: UpdateTuanHocDto) {
        await this.model.findById(id).then(async (doc) => {
            const { hocKy, ...rest } = dto;

            for (const key in dto) {
                if (Object.prototype.hasOwnProperty.call(dto, key)) {
                    doc[key] = dto[key];
                }
            }
            if (dto.hocKy) doc.hocKy = await this.hkSer.objectify(dto.hocKy);

            await doc.save();
        });
        return await this.findOne(id);
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
