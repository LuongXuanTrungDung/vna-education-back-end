import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMauDanhGiaDto } from './dto/create-mau-danh-gia.dto';
import { UpdateMauDanhGiaDto } from './dto/update-mau-danh-gia.dto';
import { MauDanhGiaDocument } from './mau-danh-gia.entity';

@Injectable()
export class MauDanhGiaService {
    constructor(
        @InjectModel('mau_danh_gia') private model: Model<MauDanhGiaDocument>,
    ) {}

    async create(dto: CreateMauDanhGiaDto) {
        return await this.model.create(dto);
    }

    async forSelect() {
        const result = [];
        const all = await this.findAll();
        for (let i = 0; i < all.length; i++) {
            result.push({
                id: all[i]._id,
                ten: all[i].tenMau,
            });
        }
        return result;
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: UpdateMauDanhGiaDto) {
        return await this.model.findByIdAndUpdate(id, {
			$set: {
				tenMau: dto.tenMau,
				ghiChu: dto.ghiChu,
				tieuChi: dto.tieuChi
			},
		},{new: true});
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
