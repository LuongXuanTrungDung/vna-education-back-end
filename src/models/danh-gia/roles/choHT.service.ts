import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanhGiaDocument } from '../danh-gia.entity';

@Injectable()
export class ChoHieuTruongService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
    ) {}

    async findAll_ofGVBM(gv: string, lop: string) {
        const all = await this.model
            .find({
                giaoVien: Object(gv),
                lopHoc: Object(lop),
            })
            .populate([
                { path: 'monHoc', select: 'tenMH' },
                {
                    path: 'giaoVien',
                    select: 'hoTen',
                },
                {
                    path: 'lopHoc',
                    select: ['maLH', 'hocSinh'],
                },
                {
                    path: 'tuanDG',
                    select: 'soTuan',
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            let temp = 0,
                diem = 0;
            for (let j = 0; j < all[i].chiTiet.length; j++) {
                temp += all[i].chiTiet[j].diemDG;
            }
            diem = temp / all[i].chiTiet.length;

            result.push({
                _id: all[i]._id,
                tenDG: all[i].tenDG,
                monHoc: all[i].monHoc ? all[i].monHoc : null,
                giaoVien: all[i].giaoVien ? all[i].giaoVien : null,
                lopHoc: all[i].lopHoc
                    ? {
                          _id: all[i].populated('lopHoc'),
                          maLH: all[i].lopHoc.maLH,
                          siSo: all[i].lopHoc.hocSinh.length,
                      }
                    : null,
                tuanDG: all[i].tuanDG ? all[i].tuanDG : null,
                chiTiet: all[i].chiTiet,
                luotDG: all[i].chiTiet.length,
                diemTB: all[i].chiTiet.length > 0 ? diem : 0,
            });
        }
        return result;
    }
}
