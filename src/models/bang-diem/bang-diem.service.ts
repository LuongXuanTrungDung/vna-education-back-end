import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BangDiemDocument } from './bang-diem.entity';
import { CreateBangDiemDto } from './dto/create-bang-diem.dto';
import { UpdateBangDiemDto } from './dto/update-bang-diem.dto';

@Injectable()
export class BangDiemService {
    constructor(
        @InjectModel('bang_diem') private model: Model<BangDiemDocument>,
    ) {}

    async create(dto: CreateBangDiemDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maBD: id });
    }

    // async findAll_byUser(hs: string) {
    //     const bd = await this.findAll();
    //     const result = [];

    //     for (let i = 0; i < bd.length; i++) {
    //         if (bd[i].hocSinh == hs) result.push(bd[i]);
    //     }
    //     return result;
    // }

    async update(id: string, dto: UpdateBangDiemDto) {
        return await this.model.findOneAndUpdate({ maBD: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maBD: id });
    }
}
