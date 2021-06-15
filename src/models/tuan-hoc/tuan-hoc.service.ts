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
        return await this.model.findOne({ maTuan: id });
    }

    async update(id: string, dto: UpdateTuanHocDto) {
        return await this.model.findOneAndUpdate({ maTuan: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maTuan: id });
    }
}
