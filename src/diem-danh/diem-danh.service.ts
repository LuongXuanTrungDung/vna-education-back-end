import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiemDanhDocument } from './diem-danh.entity';
import { CreateDiemDanhDto } from './dto/create-diem-danh.dto';
import { UpdateDiemDanhDto } from './dto/update-diem-danh.dto';

@Injectable()
export class DiemDanhService {
    constructor(
        @InjectModel('diem_danh') private model: Model<DiemDanhDocument>,
    ) {}
    async create(dto: CreateDiemDanhDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maDD: id });
    }

    async update(id: string, dto: UpdateDiemDanhDto) {
        return await this.model.findOneAndUpdate({ maDD: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maDD: id });
    }
}
