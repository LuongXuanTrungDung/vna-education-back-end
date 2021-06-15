import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanhGiaDocument } from './danh-gia.entity';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Injectable()
export class DanhGiaService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
    ) {}

    async create(dto: CreateDanhGiaDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maDG: id });
    }

    async update(id: string, dto: UpdateDanhGiaDto) {
        return await this.model.findOneAndUpdate({ maDG: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maDG: id });
    }
}
