import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { arrange } from '../../../helpers/utilities';
import { NguoiDungService } from '../../nguoi-dung/nguoi-dung.service';
import { DanhGiaDocument } from '../danh-gia.entity';
import { HSDGDto } from '../dto/HSDG.dto';

@Injectable()
export class ChoHocSinhService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async getAll_byHS(hs: string, tuan: string) {
        const result = [];
        const user = await this.ndSer.findOne_byID(hs);
        const now = new Date().getTime();
        const revs = await this.model
            .find({ lopHoc: Object(user.lopHoc._id), tuanDG: Object(tuan) })
            .populate([
                {
                    path: 'giaoVien',
                    select: 'hoTen',
                },
                { path: 'monHoc', select: 'tenMH' },
                {
                    path: 'mauDG',
                    select: 'tieuChi',
                },
                {
                    path: 'lopHoc',
                    select: 'maLH',
                },
                {
                    path: 'tuanDG',
                    select: ['soTuan', 'ngayKetThuc'],
                },
            ])
            .exec();

        // console.log(revs);

        for (let i = 0; i < revs.length; i++) {
            let n;
            const m = {
                _id: revs[i]._id,
                tenDG: revs[i].tenDG,
                monHoc: revs[i].monHoc?.tenMH,
                giaoVien: revs[i].giaoVien?.hoTen,
                choGVCN: revs[i].choGVCN,
                tuanDG: revs[i].tuanDG?.soTuan,
                hetHan: false,
            };

            if (revs[i].chiTiet.length === 0) {
                n = {
                    ...m,
                    hocSinhDG: {
                        diemDG: 0,
                        formDG: [],
                        gopY: '',
                        nguoiDG: hs,
                        trangThai: false,
                    },
                };
                if (arrange(revs[i].tuanDG.ngayKetThuc).getTime() < now)
                    n.hetHan = true;

                if (n) result.push(n);
            } else {
                const x = revs[i].chiTiet.findIndex((user) => {
                    return user.nguoiDG.toString() === hs;
                });

                if (x > -1) {
                    const loopuser = revs[i].chiTiet[x];
                    n = { ...m, hocSinhDG: loopuser };
                    if (
                        revs[i].tuanDG &&
                        arrange(revs[i].tuanDG.ngayKetThuc).getTime() < now
                    )
                        n.hetHan = true;
                    if (n) result.push(n);
                } else {
                    n = {
                        ...m,
                        hocSinhDG: {
                            diemDG: 0,
                            formDG: [],
                            gopY: '',
                            nguoiDG: hs,
                            trangThai: false,
                        },
                    };
                    if (
                        revs[i].tuanDG &&
                        arrange(revs[i].tuanDG.ngayKetThuc).getTime() < now
                    )
                        n.hetHan = true;
                    if (n) result.push(n);
                }
            }
        }

        return result;
    }

    async getOne_forHS(id: string) {
        const now = new Date().getTime();
        const one = await this.model
            .findById(id)
            .populate([
                {
                    path: 'giaoVien',
                    select: 'hoTen',
                },
                { path: 'monHoc', select: 'tenMH' },
                {
                    path: 'mauDG',
                    select: 'tieuChi',
                },
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

        const n = { hetHan: false };
        if (one.tuanDG && arrange(one.tuanDG.ngayKetThuc).getTime() < now)
            n.hetHan = true;

        return {
            _id: id,
            tenDG: one.tenDG,
            tieuChi: one.mauDG?.tieuChi,
            tuanDG: one.tuanDG?.soTuan,
            giaoVien: one.giaoVien?.hoTen,
            choGVCN: one.choGVCN,
            monHoc: one.monHoc?.tenMH,
            ...n,
            chiTiet: one.lopHoc
                ? {
                      idLop: one.populated('lopHoc'),
                      lopHoc: one.lopHoc.maLH,
                      siSo: one.lopHoc.hocSinh.length,
                      hocSinhDG: one.chiTiet,
                  }
                : null,
        };
    }

    async update_fromHS(id: string, dto: HSDGDto) {
        const { nguoiDG, ...rest } = dto;
        return await this.model.findByIdAndUpdate(id, {
            $push: { chiTiet: { ...rest, nguoiDG: Object(nguoiDG) } },
        });
    }
}
