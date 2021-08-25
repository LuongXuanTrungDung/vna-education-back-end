import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { arrange, assign, removeDuplicates } from '../../helpers/utilities';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from '../mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { DanhGiaDocument } from './danh-gia.entity';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
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
        const to404 = await this.model.find({
            tenDG: dto.tenDG,
            tuanDG: Object(dto.tuanDG),
            mauDG: Object(dto.mauDG),
            giaoVien: Object(dto.giaoVien),
        });

        if (to404.length > 0) return null;
        else {
            let toCreate = {
                tenDG: dto.tenDG,
                choGVCN: dto.choGVCN,
                daDuyet: dto.daDuyet,
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

        //  console.log(all);

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

    async findAll_byGVbySub(gv: string, mon: string) {
        const all = await this.model
            .find({ giaoVien: Object(gv), monHoc: Object(mon) })
            .populate([
                { path: 'lopHoc', select: 'maLH' },
                { path: 'tuanDG', select: 'soTuan' },
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
                idDG: all[i]._id,
                lopHoc: all[i].lopHoc ? all[i].lopHoc : null,
                tuanDG: all[i].tuanDG ? all[i].tuanDG : null,
                diemTong: all[i].chiTiet.length > 0 ? diem : 0,
            });
        }

        return removeDuplicates(result, 'lopHoc');
    }

    async finAll_byGVCN(gv: string) {
        const all = await this.model
            .find({ giaoVien: Object(gv), choGVCN: true })
            .populate({ path: 'tuanDG', select: ['soTuan', 'tenTuan'] })
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
                idDG: all[i]._id,
                tuanDG: all[i].tuanDG ? all[i].tuanDG : null,
                diemTong: all[i].chiTiet.length > 0 ? diem : 0,
            });
        }

        return removeDuplicates(result, 'lopHoc');
    }

    async findAll_byWeek(tuan: string) {
        return await this.findAll({ tuanHoc: Object(tuan) });
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
                    select: 'maLH',
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
                tieuChi: all[i].mauDG?.tieuChi,
                monHoc: all[i].monHoc
                    ? {
                          _id: all[i].populated('monHoc'),
                          tenMH: all[i].monHoc.tenMH,
                      }
                    : null,
                giaoVien: all[i].giaoVien
                    ? {
                          _id: all[i].populated('giaoVien'),
                          hoTen: all[i].giaoVien.hoTen,
                      }
                    : null,
                choGVCN: all[i].choGVCN,
                daDuyet: all[i].daDuyet,
                mauDG: all[i].mauDG
                    ? {
                          _id: all[i].populated('mauDG'),
                          tenMau: all[i].mauDG.tenMau,
                      }
                    : null,
                tuanDG: all[i].tuanDG
                    ? {
                          _id: all[i].populated('tuanDG'),
                          soTuan: all[i].tuanDG.soTuan,
                      }
                    : null,
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
            tieuChi: one.mauDG?.tieuChi,
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
            daDuyet: one.daDuyet,
            mauDG: one.mauDG
                ? {
                      _id: one.populated('mauDG'),
                      tenMau: one.mauDG.tenMau,
                  }
                : null,
            tuanDG: one.tuanDG
                ? {
                      _id: one.populated('tuanDG'),
                      soTuan: one.tuanDG.soTuan,
                  }
                : null,
            lopHoc: one.lopHoc
                ? {
                      _id: one.populated('lopHoc'),
                      maLH: one.lopHoc.maLH,
                  }
                : null,
            chiTiet: one.chiTiet,
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

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
