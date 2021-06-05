import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLopHocDto } from './dto/create-lop-hoc.dto';
import { UpdateLopHocDto } from './dto/update-lop-hoc.dto';
import { LopHocDocument } from './lop-hoc.entity';

@Injectable()
export class LopHocService {
    constructor(@InjectModel('lop_hoc') private model: Model<LopHocDocument>) {}

    async create(dto: CreateLopHocDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maLH: id });
    }

    async update(id: string, dto: UpdateLopHocDto) {
        return await this.model.findOneAndUpdate({ maLH: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maLH: id });
    }
}
