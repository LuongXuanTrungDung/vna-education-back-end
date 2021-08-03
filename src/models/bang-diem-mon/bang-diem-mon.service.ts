import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { BangDiemMonDto } from './bang-diem-mon.dto';
import { BangDiemMon } from './bang-diem-mon.entity';

@Injectable()
export class BangDiemMonService {
    constructor(
        @InjectModel('bang_diem_mon') private model: Model<BangDiemMon>,
        private readonly ndSer: NguoiDungService,
        private readonly mhSer: MonHocService,
    ) {}

    async create(dto: BangDiemMonDto) {
        return await this.model.create({
            nhanXet: dto.nhanXet,
            diemTB: dto.diemTB,
            hocKy1: {
                kiemTra_mieng: dto.ktMieng_HK1,
                kiemTra_15phut: dto.kt15phut_HK1,
                kiemTra_1tiet: dto.kt1tiet_HK1,
                thiHK: dto.thiHK1,
                diemTong: dto.tbHK1,
            },
            hocKy2: {
                kiemTra_mieng: dto.ktMieng_HK2,
                kiemTra_15phut: dto.kt15phut_HK2,
                kiemTra_1tiet: dto.kt1tiet_HK2,
                thiHK: dto.thiHK2,
                diemTong: dto.tbHK2,
            },
            hocSinh: Types.ObjectId(dto.hocSinh),
            giaoVien: Types.ObjectId(dto.giaoVien),
            monHoc: Types.ObjectId(dto.monHoc),
        });
    }

    async findAll(condition: any = {}) {
        const all = await this.model.find(condition).populate([
            {
                path: 'hocSinh',
                select: 'hoTen',
            },
            { path: 'giaoVien', select: 'hoTen' },
            { path: 'monHoc', select: 'tenMH' },
        ]);
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                hocSinh: {
                    _id: all[i].populated('hocSinh'),
                    hoTen: all[i].hocSinh.hoTen,
                },
                giaoVien: {
                    _id: all[i].populated('giaoVien'),
                    hoTen: all[i].giaoVien.hoTen,
                },
                monHoc: {
                    _id: all[i].populated('monHoc'),
                    tenMH: all[i].monHoc.tenMH,
                },
                hocKy1: all[i].hocKy1,
                hocKy2: all[i].hocKy2,
                diemTB: all[i].diemTB,
                nhanXet: all[i].nhanXet,
            });
        }
        return result;
    }

    async getAll(condition: any = {}) {
        const all = await this.model.find(condition).populate([
            {
                path: 'hocSinh',
                select: 'hoTen',
            },
            { path: 'giaoVien', select: 'hoTen' },
            { path: 'monHoc', select: 'tenMH' },
        ]);
        const result = [];
        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                hocSinh: all[i].hocSinh.hoTen,
                giaoVien: all[i].giaoVien.hoTen,
                monHoc: all[i].monHoc.tenMH,
                hocKy1: all[i].hocKy1,
                hocKy2: all[i].hocKy2,
                diemTB: all[i].diemTB,
                nhanXet: all[i].nhanXet,
            });
        }
        return result;
    }

    async findOne(p: string) {
        const bd = await (
            await this.model.findById(p)
        )
            .populate([
                {
                    path: 'hocSinh',
                    model: 'nguoi_dung',
                },
                { path: 'giaoVien', model: 'nguoi_dung' },
                { path: 'monHoc', model: 'mon_hoc' },
            ])
            .execPopulate();

        return {
            _id: p,
            hocSinh: {
                _id: bd.populated('hocSinh'),
                hoTen: bd.hocSinh.hoTen,
            },
            giaoVien: {
                _id: bd.populated('giaoVien'),
                hoTen: bd.giaoVien.hoTen,
            },
            monHoc: {
                _id: bd.populated('monHoc'),
                tenMH: bd.monHoc.tenMH,
            },
            hocKy1: bd.hocKy1,
            hocKy2: bd.hocKy2,
            diemTB: bd.diemTB,
            nhanXet: bd.nhanXet,
        };
    }

    async update(id: string, dto: BangDiemMonDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            if (dto.nhanXet) doc.nhanXet = dto.nhanXet;
            if (dto.diemTB) doc.diemTB = dto.diemTB;

            if (dto.ktMieng_HK1) doc.hocKy1.kiemTra_mieng = dto.ktMieng_HK1;
            if (dto.kt15phut_HK1) doc.hocKy1.kiemTra_15phut = dto.kt15phut_HK1;
            if (dto.ktMieng_HK1) doc.hocKy1.kiemTra_1tiet = dto.ktMieng_HK1;
            if (dto.thiHK1) doc.hocKy1.thiHK = dto.thiHK1;
            if (dto.tbHK1) doc.hocKy1.diemTong = dto.tbHK1;

            if (dto.ktMieng_HK2) doc.hocKy1.kiemTra_mieng = dto.ktMieng_HK2;
            if (dto.kt15phut_HK2) doc.hocKy1.kiemTra_15phut = dto.kt15phut_HK2;
            if (dto.ktMieng_HK2) doc.hocKy1.kiemTra_1tiet = dto.ktMieng_HK2;
            if (dto.thiHK2) doc.hocKy1.thiHK = dto.thiHK2;
            if (dto.tbHK2) doc.hocKy1.diemTong = dto.tbHK2;

            if (dto.hocSinh)
                doc.hocSinh = await this.ndSer.objectify(dto.hocSinh);
            if (dto.giaoVien)
                doc.giaoVien = await this.ndSer.objectify(dto.giaoVien);
            if (dto.monHoc) doc.monHoc = await this.mhSer.objectify(dto.monHoc);

            await doc.save();
        });
    }

    async getAll_byHS(hs: string) {
        const all = await this.getAll({ hocSinh: Object(hs) });
        const result = [];

        for (let i = 0; i < all.length; i++) {
            const { hocSinh, ...rest } = all[i];
            result.push(rest);
        }
        return result;
    }

    async objectify(rec: string) {
        return (await this.model.findById(rec))._id;
    }

    async bulkObjectify(rec: string[]) {
        const result = [];
        for (let i = 0; i < rec.length; i++) {
            result.push(await this.objectify(rec[i]));
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
