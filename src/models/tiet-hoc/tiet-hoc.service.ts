import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTietHocDto } from './dto/create-tiet-hoc.dto';
import { UpdateTietHocDto } from './dto/update-tiet-hoc.dto';
import { TietHocDocument } from './tiet-hoc.entity';

@Injectable()
export class TietHocService {
    constructor(
        @InjectModel('tiet_hoc') private model: Model<TietHocDocument>,
    ) {}

    async create(dto: CreateTietHocDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maTH: id });
    }

    async update(id: string, dto: UpdateTietHocDto) {
        return await this.model.findOneAndUpdate({ maTH: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maTH: id });
    }
}
