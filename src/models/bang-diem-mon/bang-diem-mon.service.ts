import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BangDiemMon } from './bang-diem-mon.entity';
import { CreateBangDiemMonDto } from './dto/create-bang-diem-mon.dto';
import { UpdateBangDiemMonDto } from './dto/update-bang-diem-mon.dto';

@Injectable()
export class BangDiemMonService {
    constructor(
        @InjectModel('bang_diem_mon') private model: Model<BangDiemMon>,
    ) {}

    async create(dto: CreateBangDiemMonDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: UpdateBangDiemMonDto) {
        return await this.model.findByIdAndUpdate(id, dto);
    }

    async bulkObjectify(rec: string[]) {
        const result = [];
        for (let i = 0; i < rec.length; i++) {
            result.push((await this.findOne(rec[i]))._id);
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
