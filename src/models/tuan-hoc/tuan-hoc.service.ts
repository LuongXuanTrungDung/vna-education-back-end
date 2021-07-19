import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTuanHocDto } from './dto/create-tuan-hoc.dto';
import { UpdateTuanHocDto } from './dto/update-tuan-hoc.dto';
import { TuanHocDocument } from './tuan-hoc.entity';

@Injectable()
export class TuanHocService {
    constructor(
        @InjectModel('tuan_hoc') private model: Model<TuanHocDocument>,
    ) {}

    async create(dto: CreateTuanHocDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
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

    async update(id: string, dto: UpdateTuanHocDto) {
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
