import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TieuChiDocument } from './tieu-chi.entity';
import { CreateTieuChiDto } from './dto/create-tieu-chi.dto';
import { UpdateTieuChiDto } from './dto/update-tieu-chi.dto';

@Injectable()
export class TieuChiService {
    constructor(
        @InjectModel('tieu_chi') private model: Model<TieuChiDocument>,
    ) {}

    async traMucTieu(id: string) {
        const tc = await this.model.findOne({ maTC: id });
        if (tc) return tc.mucTieu;
    }

    async create(dto: CreateTieuChiDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findOne({ maTC: id });
    }

    async update(id: string, dto: UpdateTieuChiDto) {
        return await this.model.findOneAndUpdate({ maTC: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maTC: id });
    }
}
