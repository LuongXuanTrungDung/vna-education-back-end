import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateThongBaoDto } from './dto/create-thong-bao.dto';
import { UpdateThongBaoDto } from './dto/update-thong-bao.dto';
import { ThongBaoDocument } from './thong-bao.entity';

@Injectable()
export class ThongBaoService {
    constructor(
        @InjectModel('thong_bao') private model: Model<ThongBaoDocument>,
    ) {}

    async create(dto: CreateThongBaoDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maTB: id });
    }

    async update(id: string, dto: UpdateThongBaoDto) {
        return await this.model.findOneAndUpdate({ maTB: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maTB: id });
    }
}
