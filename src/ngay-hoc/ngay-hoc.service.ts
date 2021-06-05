import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNgayHocDto } from './dto/create-ngay-hoc.dto';
import { UpdateNgayHocDto } from './dto/update-ngay-hoc.dto';
import { NgayHocDocument } from './ngay-hoc.entity';

@Injectable()
export class NgayHocService {
    constructor(
        @InjectModel('ngay_hoc') private model: Model<NgayHocDocument>,
    ) {}

    async create(dto: CreateNgayHocDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maNgay: id });
    }

    async update(id: string, dto: UpdateNgayHocDto) {
        return await this.model.findOneAndUpdate({ maNgay: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maNgay: id });
    }
}
