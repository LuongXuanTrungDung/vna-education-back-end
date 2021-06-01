import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMucTieuDto } from './dto/create-muc-tieu.dto';
import { UpdateMucTieuDto } from './dto/update-muc-tieu.dto';
import { MucTieuDocument } from './muc-tieu.entity';

@Injectable()
export class MucTieuService {
    constructor(
        @InjectModel('muc_tieu') private model: Model<MucTieuDocument>,
    ) {}

    async create(dto: CreateMucTieuDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maMT: id });
    }

    async update(id: string, dto: UpdateMucTieuDto) {
        return await this.model.findOneAndUpdate({ maMT: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maMT: id });
    }
}
