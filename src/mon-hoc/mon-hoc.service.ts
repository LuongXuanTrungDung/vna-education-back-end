import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonHocDto } from './dto/create-mon-hoc.dto';
import { UpdateMonHocDto } from './dto/update-mon-hoc.dto';
import { MonHocDocument } from './mon-hoc.entity';

@Injectable()
export class MonHocService {
    constructor(@InjectModel('mon_hoc') private model: Model<MonHocDocument>) {}

    async create(dto: CreateMonHocDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maMH: id });
    }

    async update(id: string, dto: UpdateMonHocDto) {
        return await this.model.findOneAndUpdate({ maMH: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maMH: id });
    }
}
