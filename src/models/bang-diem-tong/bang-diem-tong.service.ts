import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { bulkObjectID } from '../../helpers/utilities';
import { BangDiemMonService } from '../bang-diem-mon/bang-diem-mon.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { BangDiemTongDto } from './bang-diem-tong.dto';
import { BangDiemTongDocument } from './bang-diem-tong.entity';

@Injectable()
export class BangDiemTongService {
    constructor(
        @InjectModel('bang_diem_tong')
        private model: Model<BangDiemTongDocument>,
        private readonly ndSer: NguoiDungService,
        private readonly bdMSer: BangDiemMonService,
    ) {}

    async create(dto: BangDiemTongDto) {
        return await this.model.create({
            nhanXet: dto.nhanXet,
            xepLoai: dto.xepLoai,
            hocKy1: {
                hanhKiem: dto.hanhKiem_hk1,
                hocLuc: dto.hocLuc_hk1,
                diemTB: dto.diemTB_hk1,
            },
            hocKy2: {
                hocLuc: dto.hocLuc_hk2,
                hanhKiem: dto.hanhKiem_hk2,
                diemTB: dto.diemTB_hk2,
            },
            caNam: {
                hocLuc: dto.hocLuc_caNam,
                hanhKiem: dto.hanhKiem_caNam,
                diemTB: dto.diemTB_caNam,
            },
            hocSinh: Types.ObjectId(dto.hocSinh),
            GVCN: Types.ObjectId(dto.GVCN),
            bangDiemMon: bulkObjectID(dto.bangDiemMon),
        });
    }

    async findAll(condition: any = {}) {
        const all = await this.model
            .find(condition)
            .populate([
                {
                    path: 'hocSinh',
                    select: ['hoTen', 'lopHoc'],
                    populate: {
                        path: 'lopHoc',
                        select: 'maLH',
                    },
                },
                { path: 'GVCN', select: 'hoTen' },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                hocSinh: {
                    _id: all[i].populated('hocSinh'),
                    hoTen: all[i].hocSinh?.hoTen,
                },
                lopHoc: {
                    _id: all[i].populated('lopHoc'),
                    maLH: all[i].hocSinh?.lopHoc.maLH,
                },
                GVCN: {
                    _id: all[i].populated('GVCN'),
                    hoTen: all[i].GVCN?.hoTen,
                },
                hocKy1: all[i].hocKy1,
                hocKy2: all[i].hocKy2,
                caNam: all[i].caNam,
                xepLoai: all[i].xepLoai,
                nhanXet: all[i].nhanXet,
            });
        }
        return result;
    }

    async getAll(condition: any = {}) {
        const all = await this.model
            .find(condition)
            .populate([
                {
                    path: 'hocSinh',
                    select: ['hoTen', 'lopHoc'],
                    populate: {
                        path: 'lopHoc',
                        select: 'maLH',
                    },
                },
                { path: 'GVCN', select: 'hoTen' },
            ])
            .exec();
        const result = [];

        // console.log(all);

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                hocSinh: all[i].hocSinh?.hoTen,
                lopHoc: all[i].hocSinh?.lopHoc.maLH,
                GVCN: all[i].GVCN?.hoTen,
                hocKy1: all[i].hocKy1,
                hocKy2: all[i].hocKy2,
                caNam: all[i].caNam,
                xepLoai: all[i].xepLoai,
                nhanXet: all[i].nhanXet,
            });
        }
        return result;
    }

    async getOne_byHS(hs: string) {
        const m = await this.bdMSer.getAll_byHS(hs);
        const t = await this.getAll({ hocSinh: Object(hs) });
        return { ...t[0], bangDiemMon: m };
    }

    async findOne(rec: string) {
        const bd = await (
            await this.model.findById(rec)
        )
            .populate([
                {
                    path: 'hocSinh',
                    model: 'nguoi_dung',
                    populate: {
                        path: 'lopHoc',
                        model: 'lop_hoc',
                    },
                },
                { path: 'GVCN', model: 'nguoi_dung' },
            ])
            .execPopulate();

        return {
            _id: rec,
            hocSinh: {
                _id: bd.populated('hocSinh'),
                hoTen: bd.hocSinh?.hoTen,
            },
            lopHoc: {
                _id: bd.populated('lopHoc'),
                maLH: bd.hocSinh?.lopHoc.maLH,
            },
            GVCN: {
                _id: bd.populated('GVCN'),
                hoTen: bd.GVCN?.hoTen,
            },
            hocKy1: bd.hocKy1,
            hocKy2: bd.hocKy2,
            caNam: bd.caNam,
            xepLoai: bd.xepLoai,
            nhanXet: bd.nhanXet,
        };
    }

    async update(id: string, dto: BangDiemTongDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;

            if (dto.nhanXet) doc.nhanXet = dto.nhanXet;
            if (dto.xepLoai) doc.xepLoai = dto.xepLoai;

            if (dto.hanhKiem_hk1) doc.hocKy1.hanhKiem = dto.hanhKiem_hk1;
            if (dto.hocLuc_hk1) doc.hocKy1.hocLuc = dto.hocLuc_hk1;
            if (dto.diemTB_hk1) doc.hocKy1.diemTB = dto.diemTB_hk1;

            if (dto.hanhKiem_hk2) doc.hocKy2.hanhKiem = dto.hanhKiem_hk2;
            if (dto.hocLuc_hk2) doc.hocKy2.hocLuc = dto.hocLuc_hk2;
            if (dto.diemTB_hk2) doc.hocKy2.diemTB = dto.diemTB_hk2;

            if (dto.hanhKiem_caNam) doc.caNam.hanhKiem = dto.hanhKiem_caNam;
            if (dto.hocLuc_caNam) doc.caNam.hocLuc = dto.hocLuc_caNam;
            if (dto.diemTB_caNam) doc.caNam.diemTB = dto.diemTB_caNam;

            if (dto.hocSinh)
                doc.hocSinh = await this.ndSer.objectify(dto.hocSinh);
            if (dto.GVCN) doc.GVCN = await this.ndSer.objectify(dto.GVCN);
            if (dto.bangDiemMon)
                doc.bangDiemMon = await this.bdMSer.bulkObjectify(
                    dto.bangDiemMon,
                );

            await doc.save();
        });
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
