import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanhGiaService } from '../danh-gia/danh-gia.service';
import { MauDanhGiaDto } from './mau-danh-gia.dto';
import { MauDanhGia, MauDanhGiaDocument } from './mau-danh-gia.entity';

@Injectable()
export class MauDanhGiaService {
    constructor(
        @InjectModel('mau_danh_gia') private model: Model<MauDanhGiaDocument>,
        @Inject(forwardRef(() => DanhGiaService))
        private readonly dgSer: DanhGiaService,
    ) {}

    async create(dto: MauDanhGiaDto) {
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
        const all = await this.model.find({});
        const result = [];
        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne(all[i]._id));
        }
        return result;
    }

    async findOne(id: string | MauDanhGia) {
        const one = await this.model.findById(id);
        return {
            tenMau: one.tenMau,
            ghiChu: one.ghiChu,
            tieuChi: one.tieuChi,
        };
    }

    async update(id: string, dto: MauDanhGiaDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            if (dto.tenMau) doc.tenMau = dto.tenMau;
            if (dto.ghiChu) doc.ghiChu = dto.ghiChu;
            if (dto.tieuChi) doc.tieuChi = dto.tieuChi;
            await doc.save();
        });
    }

    async objectify(id: string) {
        return (await this.model.findById(id))._id;
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
