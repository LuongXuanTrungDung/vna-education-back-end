import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanhGiaService } from '../danh-gia/danh-gia.service';
import { CreateMauDanhGiaDto } from './dto/create-mau-danh-gia.dto';
import { UpdateMauDanhGiaDto } from './dto/update-mau-danh-gia.dto';
import { MauDanhGiaDocument } from './mau-danh-gia.entity';

@Injectable()
export class MauDanhGiaService {
    constructor(
        @InjectModel('mau_danh_gia') private model: Model<MauDanhGiaDocument>,
        @Inject(forwardRef(() => DanhGiaService))
        private readonly dgSer: DanhGiaService,
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
		return await this.model.findById(id, null, null, (err, doc) => {
			if (err) {
				console.log(err);
				return null
			}
			else return doc
		});
    }

    async update(id: string, dto: UpdateMauDanhGiaDto) {
        await this.findOne(id).then(async (doc) => {
            if (dto.tenMau) doc.tenMau = dto.tenMau;
            if (dto.ghiChu) doc.ghiChu = dto.ghiChu;
            if (dto.tieuChi) doc.tieuChi = dto.tieuChi;
            await doc.save();
        });
        return 'Cập nhật thành công';
    }

    async remove(id: string) {
        const revs = await this.dgSer.findAll();
        const name = (await this.findOne(id)).tenMau;
        for (let i = 0; i < revs.length; i++) {
            if (revs[i].mauDG === name) {
                return null;
            }
        }
        return await this.model.findByIdAndDelete(id);
    }
}
