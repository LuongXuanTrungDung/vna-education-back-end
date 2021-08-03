import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign } from '../../helpers/utilities';
import { BuoiHocService } from '../buoi-hoc/buoi-hoc.service';
import { DiemDanhService } from '../diem-danh/diem-danh.service';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { CreateTietHocDto } from './dto/create-tiet-hoc.dto';
import { UpdateTietHocDto } from './dto/update-tiet-hoc.dto';
import { TietHocDocument } from './tiet-hoc.entity';

@Injectable()
export class TietHocService {
    constructor(
        @InjectModel('tiet_hoc') private model: Model<TietHocDocument>,
        private readonly lhSer: LopHocService,
        private readonly ndSer: NguoiDungService,
        private readonly mhSer: MonHocService,
        private readonly ddSer: DiemDanhService,
        private readonly bhSer: BuoiHocService,
    ) {}

    async create(dto: CreateTietHocDto) {
        return await this.model.create({
            giaoVien: Types.ObjectId(dto.giaoVien),
            monHoc: Types.ObjectId(dto.monHoc),
            lopHoc: Types.ObjectId(dto.lopHoc),
            thuTiet: dto.thuTiet,
            thoiGian_batDau: dto.thoiGian_batDau,
            buoiHoc: Types.ObjectId(dto.buoiHoc),
            diemDanh: [],
        });
    }

    async findAll() {
        const all = await this.model
            .find()
            .populate([
                { path: 'giaoVien', select: 'hoTen' },
                { path: 'monHoc', select: 'tenMH' },
                { path: 'lopHoc', select: 'maLH' },
                {
                    path: 'buoiHoc',
                    select: ['thu', 'ngayHoc'],
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                thuTiet: all[i].thuTiet,
                thoiGian: all[i].thoiGian_batDau,
                giaoVien: all[i].giaoVien
                    ? {
                          _id: all[i].populated('giaoVien'),
                          hoTen: all[i].giaoVien.hoTen,
                      }
                    : null,
                monHoc: all[i].monHoc
                    ? {
                          _id: all[i].populated('monHoc'),
                          tenMH: all[i].monHoc.tenMH,
                      }
                    : null,
                lopHoc: all[i].lopHoc
                    ? {
                          _id: all[i].populated('lopHoc'),
                          maLH: all[i].lopHoc.maLH,
                      }
                    : null,
                buoiHoc: all[i].buoiHoc
                    ? {
                          _id: all[i].populated('buoiHoc'),
                          thu: all[i].buoiHoc.thu,
                          ngayHoc: all[i].buoiHoc.ngayHoc,
                      }
                    : null,
            });
        }
        return result;
    }

    async getAll() {
        const all = await this.model
            .find()
            .populate([
                { path: 'giaoVien', select: 'hoTen' },
                { path: 'monHoc', select: 'tenMH' },
                { path: 'lopHoc', select: 'maLH' },
                {
                    path: 'buoiHoc',
                    select: ['tuanHoc', 'thu', 'ngayHoc'],
                    populate: {
                        path: 'tuanHoc',
                        select: 'soTuan',
                    },
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                thuTiet: all[i].thuTiet,
                thoiGian: all[i].thoiGian_batDau,
                giaoVien: all[i].giaoVien.hoTen,
                monHoc: all[i].monHoc.tenMH,
                lopHoc: all[i].lopHoc ? all[i].lopHoc.maLH : null,
                buoiHoc: all[i].buoiHoc
                    ? {
                          thu: all[i].buoiHoc.thu,
                          ngayHoc: all[i].buoiHoc.ngayHoc,
                          tuanHoc: all[i].buoiHoc.tuanHoc.soTuan,
                      }
                    : null,
            });
        }
        return result;
    }

    async findOne(tiet: string) {
        const cl = await (
            await this.model.findById(tiet)
        )
            .populate([
                { path: 'giaoVien', select: 'hoTen' },
                { path: 'monHoc', select: 'tenMH' },
                { path: 'lopHoc', select: 'maLH' },
                {
                    path: 'buoiHoc',
                    select: ['thu', 'ngayHoc'],
                },
            ])
            .execPopulate();
        return {
            _id: tiet,
            thuTiet: cl.thuTiet,
            thoiGian: cl.thoiGian_batDau,
            giaoVien: {
                _id: cl.populated('giaoVien'),
                hoTen: cl.giaoVien.hoTen,
            },
            monHoc: {
                _id: cl.populated('monHoc'),
                tenMH: cl.monHoc.tenMH,
            },
            lopHoc: cl.lopHoc
                ? {
                      _id: cl.populated('lopHoc'),
                      maLH: cl.lopHoc.maLH,
                  }
                : null,
            buoiHoc: cl.buoiHoc
                ? {
                      _id: cl.populated('buoiHoc'),
                      thu: cl.buoiHoc.thu,
                      ngayHoc: cl.buoiHoc.ngayHoc,
                  }
                : null,
        };
    }

    async findAll_byDate(buoi: string) {
        const b = await this.bhSer.findOne(buoi);
        const all = await this.model
            .find({ buoiHoc: Object(buoi) })
            .populate([
                { path: 'giaoVien', select: 'hoTen' },
                { path: 'monHoc', select: 'tenMH' },
                { path: 'lopHoc', select: 'maLH' },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                id: all[i]._id,
                thuTiet: all[i].thuTiet,
                thoiGian: all[i].thoiGian_batDau,
                giaoVien: all[i].giaoVien,
                monHoc: all[i].monHoc,
                lopHoc: all[i].lopHoc ? all[i].lopHoc.maLH : null,
            });
        }
        return { ...b, tietHoc: result };
    }

    async update(id: string, dto: UpdateTietHocDto) {
        const { lopHoc, giaoVien, monHoc, diemDanh, buoiHoc, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (lopHoc) doc.lopHoc = await this.lhSer.objectify_fromID(lopHoc);
            if (giaoVien) doc.giaoVien = await this.ndSer.objectify(giaoVien);
            if (monHoc) doc.monHoc = await this.mhSer.objectify(monHoc);
            if (buoiHoc) doc.buoiHoc = await this.bhSer.objectify(buoiHoc);
            if (diemDanh)
                doc.diemDanh = await this.ddSer.bulkObjectify(diemDanh);
            await doc.save();
        });
    }

    async objectify(tiet: string) {
        return (await this.model.findById(tiet))._id;
    }

    async bulkObjectify(tiet: string[]) {
        const result = [];
        for (let i = 0; i < tiet.length; i++) {
            result.push(await this.objectify(tiet[i]));
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
