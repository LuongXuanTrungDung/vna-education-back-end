import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { arrange } from '../../../helpers/utilities';
import { NguoiDungService } from '../../nguoi-dung/nguoi-dung.service';
import { DanhGiaDocument } from '../danh-gia.entity';

@Injectable()
export class ChoGiaoViehService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async getAll_byGV(gv: string, tuan: string) {
        const result = [];
        const now = new Date().getTime();
        const all = await this.model
            .find({ giaoVien: Object(gv), tuanDG: Object(tuan) })
            .populate([
                { path: 'monHoc', select: 'tenMH' },
                {
                    path: 'lopHoc',
                    select: ['maLH', 'hocSinh'],
                },
                {
                    path: 'tuanDG',
                    select: ['soTuan', 'ngayKetThuc'],
                },
            ])
            .exec();

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
                monHoc: all[i].monHoc?.tenMH,
                choGVCN: all[i].choGVCN,
                daDuyet: all[i].daDuyet,
                lopHoc: all[i].lopHoc
                    ? {
                          maLH: all[i].lopHoc.maLH,
                          siSo: await this.ndSer.classCount(all[i].populated('lopHoc')),
						  luotDG: all[i].chiTiet.length
                      }
                    : null,
                tuanDG: all[i].tuanDG?.soTuan,
                diemTB: all[i].chiTiet.length > 0 ? diem : 0,
                hetHan:
                    arrange(all[i].tuanDG.ngayKetThuc).getTime() < now
                        ? true
                        : false,
            });
        }
        return result;
    }

    async getOne_forGV(id: string) {
        const one = await this.model
            .findById(id)
            .populate([
                { path: 'monHoc', select: 'tenMH' },
                { path: 'mauDG', select: 'tieuChi' },
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

        let temp = 0,
            diem = 0;
        for (let i = 0; i < one.chiTiet.length; i++) {
            temp += one.chiTiet[i].diemDG;
        }
        diem = temp / one.chiTiet.length;

        return {
            _id: id,
            tenDG: one.tenDG,
            monHoc: one.monHoc?.tenMH,
            tieuChi: one.mauDG?.tieuChi,
            choGVCN: one.choGVCN,
            daDuyet: one.daDuyet,
            lopHoc: one.lopHoc
                ? {
                      maLH: one.lopHoc.maLH,
                      siSo: await this.ndSer.classCount(one.populated('lopHoc')),
					  luotDG: one.chiTiet.length
                  }
                : null,
            tuanDG: one.tuanDG?.soTuan,
            chiTiet: one.chiTiet,
            diemDG: one.chiTiet.length > 0 ? diem : 0,
        };
    }
}
