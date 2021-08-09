import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { arrange, assign } from '../../helpers/utilities';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from '../mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { DanhGiaDocument } from './danh-gia.entity';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { HSDGDto } from './dto/HSDG.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Injectable()
export class DanhGiaService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
        private readonly ndSer: NguoiDungService,
        @Inject(forwardRef(() => MauDanhGiaService))
        private readonly mdgSer: MauDanhGiaService,
        private readonly lhSer: LopHocService,
        private readonly mhSer: MonHocService,
        private readonly tuanSer: TuanHocService,
    ) {}

    async create(dto: CreateDanhGiaDto) {
        let toCreate = {
            tenDG: dto.tenDG,
            choGVCN: dto.choGVCN,
            tuanDG: Types.ObjectId(dto.tuanDG),
            mauDG: Types.ObjectId(dto.mauDG),
            giaoVien: Types.ObjectId(dto.giaoVien),
        };

        if (dto.monHoc)
            toCreate = Object.assign(toCreate, {
                monHoc: Types.ObjectId(dto.monHoc),
            });
        if (dto.lopHoc)
            toCreate = Object.assign(toCreate, {
                lopHoc: Types.ObjectId(dto.lopHoc),
            });

        return await this.model.create(toCreate);
    }

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
                giaoVien: revs[i].giaoVien.hoTen,
                choGVCN: revs[i].choGVCN,
                tuanDG: revs[i].tuanDG.soTuan,
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
                    if (arrange(revs[i].tuanDG.ngayKetThuc).getTime() < now)
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
                    if (arrange(revs[i].tuanDG.ngayKetThuc).getTime() < now)
                        n.hetHan = true;
                    if (n) result.push(n);
                }
            }
        }

        return result;
    }

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
            if (arrange(all[i].tuanDG.ngayKetThuc).getTime() > now) {
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
                    lopHoc: all[i].lopHoc
                        ? {
                              maLH: all[i].lopHoc.maLH,
                              siSo: all[i].lopHoc.hocSinh.length,
                          }
                        : null,
                    tuanDG: all[i].tuanDG.soTuan,
                    chiTiet: all[i].chiTiet,
                    diemTB: all[i].chiTiet.length > 0 ? diem : 0,
                });
            }
        }
        return result;
    }

    async getUnfinished(hs: string, tuan: string) {
        const user = await this.ndSer.findOne_byID(hs);
        const now = new Date().getTime();
        const all = await this.model
            .find({ lopHoc: Object(user.lopHoc._id), tuanDG: Object(tuan) })
            .populate({
                path: 'tuanDG',
                select: 'ngayKetThuc',
            })
            .exec();
        const result = [];

        console.log(all);

        for (let i = 0; i < all.length; i++) {
            // còn hạn
            if (arrange(all[i].tuanDG.ngayKetThuc).getTime() > now) {
                // loop
                if (all[i].chiTiet.length === 0) {
                    // trả "_id": "610a86614222fd9488ef8c4c",
                    // "tenDG": "Đánh giá GVCN  Nguyển Sơn Tùng clone 1"
                    result.push({
                        _id: all[i]._id,
                        tenDG: all[i].tenDG,
                    });
                } else {
                    const x = all[i].chiTiet.findIndex((user) => {
                        return (
                            user.nguoiDG.toString() === Object(hs).toString()
                        );
                    });

                    if (x === -1) {
                        result.push({
                            _id: all[i]._id,
                            tenDG: all[i].tenDG,
                        });
                    }
                }
            }
        }

        return result;
    }

    async findAll_bySubject(mon: string) {
        return await this.findAll({ monHoc: Object(mon) });
    }

    async findAll(condition: any = {}) {
        const result = [];
        const all = await this.model
            .find(condition)
            .populate([
                {
                    path: 'giaoVien',
                    select: 'hoTen',
                },
                { path: 'monHoc', select: 'tenMH' },
                {
                    path: 'mauDG',
                    select: ['tieuChi', 'tenMau'],
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

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                tenDG: all[i].tenDG,
                tieuChi: all[i].mauDG.tieuChi,
                monHoc: all[i].monHoc
                    ? {
                          _id: all[i].populated('monHoc'),
                          tenMH: all[i].monHoc.tenMH,
                      }
                    : null,
                giaoVien: {
                    _id: all[i].populated('giaoVien'),
                    hoTen: all[i].giaoVien.hoTen,
                },
                choGVCN: all[i].choGVCN,
                mauDG: {
                    _id: all[i].populated('mauDG'),
                    tenMau: all[i].mauDG.tenMau,
                },
                tuanDG: {
                    _id: all[i].populated('tuanDG'),
                    soTuan: all[i].tuanDG.soTuan,
                },
                lopHoc: all[i].lopHoc
                    ? {
                          _id: all[i].populated('lopHoc'),
                          maLH: all[i].lopHoc.maLH,
                      }
                    : null,
                chiTiet: all[i].chiTiet,
            });
        }
        return result;
    }

    async findOne(id: string) {
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
                    select: ['tieuChi', 'tenMau'],
                },
                {
                    path: 'lopHoc',
                    select: 'maLH',
                },
                {
                    path: 'tuanDG',
                    select: 'soTuan',
                },
            ])
            .exec();
        return {
            _id: id,
            tenDG: one.tenDG,
            tieuChi: one.mauDG.tieuChi,
            monHoc: one.monHoc
                ? {
                      _id: one.populated('monHoc'),
                      tenMH: one.monHoc.tenMH,
                  }
                : null,
            giaoVien: {
                _id: one.populated('giaoVien'),
                hoTen: one.giaoVien.hoTen,
            },
            choGVCN: one.choGVCN,
            mauDG: {
                _id: one.populated('mauDG'),
                tenMau: one.mauDG.tenMau,
            },
            tuanDG: {
                _id: one.populated('tuanDG'),
                soTuan: one.tuanDG.soTuan,
            },
            lopHoc: one.lopHoc
                ? {
                      _id: one.populated('lopHoc'),
                      maLH: one.lopHoc.maLH,
                  }
                : null,
            chiTiet: one.chiTiet,
        };
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
        if (arrange(one.tuanDG.ngayKetThuc).getTime() < now) n.hetHan = true;

        return {
            _id: id,
            tenDG: one.tenDG,
            tieuChi: one.mauDG.tieuChi,
            tuanDG: one.tuanDG.soTuan,
            giaoVien: one.giaoVien.hoTen,
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

    async getOne_forGV(id: string) {
        const one = await this.model
            .findById(id)
            .populate([
                { path: 'monHoc', select: 'tenMH' },
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
        for (let i = 0; i < one.chiTiet.length; j++) {
            temp += one.chiTiet[i].diemDG;
        }
        diem = temp / one.chiTiet.length;

        return {
            _id: id,
            tenDG: one.tenDG,
            monHoc: one.monHoc?.tenMH,
            choGVCN: one.choGVCN,
            lopHoc: one.lopHoc
                ? {
                      maLH: one.lopHoc.maLH,
                      siSo: one.lopHoc.hocSinh.length,
                  }
                : null,
            tuanDG: one.tuanDG.soTuan,
            chiTiet: one.chiTiet,
            diemDG: one.chiTiet.length > 0 ? diem : 0,
        };
    }

    async update(id: string, dto: UpdateDanhGiaDto) {
        const { monHoc, mauDG, lopHoc, giaoVien, tuanDG, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (monHoc) doc.monHoc = await this.mhSer.objectify(monHoc);
            if (mauDG) doc.mauDG = await this.mdgSer.objectify(mauDG);
            if (lopHoc) doc.lopHoc = await this.lhSer.objectify_fromID(lopHoc);
            if (giaoVien) doc.giaoVien = await this.ndSer.objectify(giaoVien);
            if (tuanDG) doc.tuanDG = await this.tuanSer.objectify(tuanDG);
            await doc.save();
        });
    }

    async update_fromHS(id: string, dto: HSDGDto) {
        const { nguoiDG, ...rest } = dto;
        return await this.model.findByIdAndUpdate(id, {
            $push: { chiTiet: { ...rest, nguoiDG: Object(nguoiDG) } },
        });
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
