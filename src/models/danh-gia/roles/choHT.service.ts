import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanhGiaDocument } from '../danh-gia.entity';
import { DanhGiaService } from '../danh-gia.service';

@Injectable()
export class ChoHieuTruongService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
        private readonly dgSer: DanhGiaService,
    ) {}

    async findAll_choGVBM(gv: string, lop: string) {
        const all = await this.dgSer.findAll({
            giaoVien: Object(gv),
            lopHoc: Object(lop),
        });
        const result = [];

        for (let i = 0; i < all.length; i++) {
            if (!all[i].choGVCN) {
                let temp = 0,
                    diem = 0;
                const { choGVCN, tieuChi, mauDG, ...toPush } = all[i];

                for (let j = 0; j < all[i].chiTiet.length; j++) {
                    temp += all[i].chiTiet[j].diemDG;
                }
                diem = temp / all[i].chiTiet.length;

                result.push({
                    ...toPush,
                    luotDG: all[i].chiTiet.length,
                    diemTong: all[i].chiTiet.length > 0 ? diem : 0,
                });
            }
        }
        return result;
    }

    // async findAll_byYear(year: string, gv: string) {
    //     const oneYear = await this.namSer.getOne(year)[0];
    //     const allDG = await this.model
    //         .find({ giaoVien: Object(gv) })
    //         .populate([
    //             {
    //                 path: 'giaoVien',
    //                 select: 'hoTen',
    //             },
    //             { path: 'monHoc', select: 'tenMH' },
    //             {
    //                 path: 'lopHoc',
    //                 select: ['maLH', 'hocSinh'],
    //             },
    //             {
    //                 path: 'namDG',
    //                 select: 'tenNam',
    //             },
    //         ])
    //         .exec();
    //     const result = [];

    //     for (let i = 0; i < allDG.length; i++) {
    //         if (allDG[i].choGVCN && allDG[i].namDG && allDG[i].namDG.tenNam === oneYear.tenNam) {
    //             let temp = 0,
    //                 diem = 0;

    //             for (let j = 0; j < allDG[i].chiTiet.length; j++) {
    //                 temp += allDG[i].chiTiet[j].diemDG;
    //             }
    //             diem = temp / allDG[i].chiTiet.length;

    //             result.push({
    //                 _id: allDG[i]._id,
    //                 tenDG: allDG[i].tenDG,
    //                 monHoc: allDG[i].monHoc
    //                     ? {
    //                           _id: allDG[i].populated('monHoc'),
    //                           tenMH: allDG[i].monHoc.tenMH,
    //                       }
    //                     : null,
    //                 giaoVien: allDG[i].giaoVien
    //                     ? {
    //                           _id: allDG[i].populated('giaoVien'),
    //                           hoTen: allDG[i].giaoVien.hoTen,
    //                       }
    //                     : null,
    //                 namDG: allDG[i].namDG
    //                     ? {
    //                           _id: allDG[i].populated('namDG'),
    //                           tenNam: allDG[i].namDG.tenNam,
    //                       }
    //                     : null,
    //                 lopHoc: allDG[i].lopHoc
    //                     ? {
    //                           _id: allDG[i].populated('lopHoc'),
    //                           maLH: allDG[i].lopHoc.maLH,
    //                       }
    //                     : null,
    //                 chiTiet: allDG[i].chiTiet,
    //                 luotDG: allDG[i].chiTiet.length,
    //                 diemTong: allDG[i].chiTiet.length > 0 ? diem : 0,
    //             });
    //         }
    //     }

    //     return result
    // }

    async findOne_forHT(id: string) {
        const one = await this.model
            .findById(id)
            .populate([
                {
                    path: 'giaoVien',
                    select: 'hoTen',
                },
                { path: 'monHoc', select: 'tenMH' },
                {
                    path: 'lopHoc',
                    select: 'maLH',
                },
                {
                    path: 'tuanDG',
                    select: ['soTuan', 'hocKy'],
                },
            ])
            .exec();

        let temp = 0,
            diem = 0;

        for (let j = 0; j < one.chiTiet.length; j++) {
            temp += one.chiTiet[j].diemDG;
        }
        diem = temp / one.chiTiet.length;

        return {
            _id: id,
            tenDG: one.tenDG,
            monHoc: one.monHoc
                ? {
                      _id: one.populated('monHoc'),
                      tenMH: one.monHoc.tenMH,
                  }
                : null,
            giaoVien: one.giaoVien
                ? {
                      _id: one.populated('giaoVien'),
                      hoTen: one.giaoVien.hoTen,
                  }
                : null,
            choGVCN: one.choGVCN,
            tuanDG: one.tuanDG
                ? {
                      _id: one.populated('tuanDG'),
                      soTuan: one.tuanDG.soTuan,
                      hocKy: one.tuanDG.hocKy,
                  }
                : null,
            lopHoc: one.lopHoc
                ? {
                      _id: one.populated('lopHoc'),
                      maLH: one.lopHoc.maLH,
                  }
                : null,
            chiTiet: one.chiTiet,
            luotDG: one.chiTiet.length,
            diemTong: one.chiTiet.length > 0 ? diem : 0,
        };
    }
}
