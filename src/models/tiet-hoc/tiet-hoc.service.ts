import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DiemDanhService } from '../diem-danh/diem-danh.service';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
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
        private readonly tuanSer: TuanHocService,
        private readonly ddSer: DiemDanhService,
    ) {}

    async create(dto: CreateTietHocDto) {
        return await this.model.create({
            giaoVien: Types.ObjectId(dto.giaoVien),
            monHoc: Types.ObjectId(dto.monHoc),
            lopHoc: Types.ObjectId(dto.lopHoc),
            tuanHoc: Types.ObjectId(dto.tuanHoc),
            ghiChu: dto.ghiChu,
            ngayHoc: dto.ngayHoc,
            diemDanh: [],
        });
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(tiet: string) {
        const dd = [];
        const cl = await (
            await this.model.findById(tiet)
        )
            .populate([
                { path: 'giaoVien', model: 'nguoi_dung' },
                { path: 'monHoc', model: 'mon_hoc' },
                { path: 'lopHoc', model: 'lop_hoc' },
                { path: 'tuanHoc', model: 'tuan_hoc' },
                {
                    path: 'diemDanh',
                    model: 'diem_danh',
                    populate: {
                        path: 'hocSinh',
                        model: 'nguoi_dung',
                    },
                },
            ])
            .execPopulate();

        for (let i = 0; i < cl.diemDanh.length; i++) {
            dd.push({
                hocSinh: cl.diemDanh[i].hocSinh.hoTen,
                trangThai: cl.diemDanh[i].trangThai,
                ghiChu: cl.diemDanh[i].ghiChu,
            });
        }

        return {
            id: tiet,
            ghiChu: cl.ghiChu,
            ngayHoc: cl.ngayHoc,
            giaoVien: cl.giaoVien.hoTen,
            monHoc: cl.monHoc.tenMH,
            lopHoc: cl.lopHoc.maLH,
            tuanHoc: cl.tuanHoc.soTuan,
            diemDanh: dd,
        };
    }

    async update(id: string, dto: UpdateTietHocDto) {
        await this.model.findById(id).then(async (doc) => {
            if (dto.lopHoc)
                doc.lopHoc = await this.lhSer.objectify_fromID(dto.lopHoc);
            if (dto.giaoVien)
                doc.giaoVien = await this.ndSer.objectify(dto.giaoVien);
            if (dto.monHoc) doc.monHoc = await this.mhSer.objectify(dto.monHoc);
            if (dto.tuanHoc)
                doc.tuanHoc = await this.tuanSer.objectify(dto.tuanHoc);

            if (dto.ghiChu) doc.ghiChu = dto.ghiChu;
            if (dto.ngayHoc) doc.ngayHoc = dto.ngayHoc;

            if (dto.diemDanh && dto.diemDanh.length >= 1) {
                const temp = [];
                for (let i = 0; i < dto.diemDanh.length; i++) {
                    temp.push(await this.ddSer.objectify(dto.diemDanh[i]));
                }
                doc.diemDanh = temp;
            }

            await doc.save();
        });
        return await this.findOne(id);
    }

    async objectify(tiet: string) {
        return (await this.model.findById(tiet))._id;
    }

    async bulkObjectify(tiet: string[]) {
        const result = [];
        for (let i = 0; i < tiet.length; i++) {
            result.push(await this.findOne(tiet[i]));
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
