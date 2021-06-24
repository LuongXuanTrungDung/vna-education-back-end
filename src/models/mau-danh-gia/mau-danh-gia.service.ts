import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMauDanhGiaDto } from './dto/create-mau-danh-gia.dto';
import { UpdateMauDanhGiaDto } from './dto/update-mau-danh-gia.dto';
import { MauDanhGiaDocument } from './mau-danh-gia.entity';

@Injectable()
export class MauDanhGiaService {
    constructor(
        @InjectModel('mau_danh_gia') private model: Model<MauDanhGiaDocument>,
    ) {}

    async create(dto: CreateMauDanhGiaDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: UpdateMauDanhGiaDto) {
        return await this.model.findByIdAndUpdate(id, dto);
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
