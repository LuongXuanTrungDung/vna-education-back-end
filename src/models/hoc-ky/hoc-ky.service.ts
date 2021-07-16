import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHocKyDto } from './dto/create-hoc-ky.dto';
import { UpdateHocKyDto } from './dto/update-hoc-ky.dto';
import { HocKyDocument } from './hoc-ky.entity';

@Injectable()
export class HocKyService {
    constructor(@InjectModel('hoc_ky') private model: Model<HocKyDocument>) {}
    async create(dto: CreateHocKyDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return this.model.find({});
    }

    async findOne(id: string) {
        const hk = await this.model.findById(id);
        return {
            id: hk._id,
            tenHK: hk.tenHK,
            ngayBatDau: hk.ngayBatDau,
            ngayKetThuc: hk.ngayKetThuc,
        };
    }

    async update(id: string, dto: UpdateHocKyDto) {
        await this.model.findById(id).then(async (doc) => {
            for (const key in dto) {
                if (Object.prototype.hasOwnProperty.call(dto, key)) {
                    doc[key] = dto[key];
                }
            }
            await doc.save();
        });
        return await this.findOne(id);
    }

    async objectify(hk: string) {
        return (await this.model.findById(hk))._id;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
