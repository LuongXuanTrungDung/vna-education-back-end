import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DanhGiaDocument } from './danh-gia.entity';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Injectable()
export class DanhGiaService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
    ) {}

    async create(dto: CreateDanhGiaDto) {
        return await this.model.create(dto);
    }

    async findAll_byUser(user: string) {
        const result = [];
        const revs = await this.findAll();
        for (let i = 0; i < revs.length; i++) {
            if (revs[i].nguoiDG == user) {
                const { nguoiDG, ...rest } = revs[i];
                result.push(rest);
            }
        }
        return result;
    }

    async findAll() {
        const result = [];
        const all = await this.model
            .find({})
            .populate([
                { path: 'ngayDG', model: 'ngay_hoc' },
                {
                    path: 'doiTuongDG',
                    model: 'nguoi_dung',
                },
                {
                    path: 'mauDG',
                    model: 'mau_danh_gia',
                    populate: { path: 'monHoc', model: 'mon_hoc' },
                },
            ])
            .exec();
        for (let i = 0; i < all.length; i++) {
            result.push({
                id: all[i]._id,
                tenDG: all[i].tenDG,
                trangThai: all[i].trangThai,
                diemDG: all[i].diemDG,
                ngayDG: all[i].ngayDG.maNgay,
                tieuChi: all[i].mauDG.tieuChi,
                nguoiDG: all[i].nguoiDG,
                monHoc: all[i].mauDG.monHoc.tenMH,
                doiTuongDG: all[i].doiTuongDG.hoTen,
                choGVCN: all[i].choGVCN,
            });
        }
        return result;
    }

    async findOne(id: string) {
        const rev = await (
            await this.model.findById(id)
        )
            .populate([
                { path: 'ngayDG', model: 'ngay_hoc' },
                {
                    path: 'doiTuongDG',
                    model: 'nguoi_dung',
                },
                {
                    path: 'mauDG',
                    model: 'mau_danh_gia',
                    populate: { path: 'monHoc', model: 'mon_hoc' },
                },
            ])
            .execPopulate();
        return {
            id: rev._id,
            tenDG: rev.tenDG,
            trangThai: rev.trangThai,
            diemDG: rev.diemDG,
            ngayDG: rev.ngayDG.maNgay,
            tieuChi: rev.mauDG.tieuChi,
            monHoc: rev.mauDG.monHoc.tenMH,
            doiTuongDG: rev.doiTuongDG.hoTen,
        };
    }

    async update(id: string, dto: UpdateDanhGiaDto) {
        return await this.model.findByIdAndUpdate(id, dto);
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
