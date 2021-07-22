import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DiemDanhService } from '../diem-danh/diem-danh.service';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { CreateTietHocDto } from './dto/create-tiet-hoc.dto';
import { UpdateTietHocDto } from './dto/update-tiet-hoc.dto';
import { TietHoc, TietHocDocument } from './tiet-hoc.entity';

@Injectable()
export class TietHocService {
    constructor(
        @InjectModel('tiet_hoc') private model: Model<TietHocDocument>,
        @Inject(forwardRef(() => TuanHocService))
        private readonly tuanSer: TuanHocService,
        private readonly lhSer: LopHocService,
        private readonly ndSer: NguoiDungService,
        private readonly mhSer: MonHocService,
        private readonly ddSer: DiemDanhService,
    ) {}

    async create(dto: CreateTietHocDto) {
        return await this.model.create({
            giaoVien: Types.ObjectId(dto.giaoVien),
            monHoc: Types.ObjectId(dto.monHoc),
            lopHoc: Types.ObjectId(dto.lopHoc),
            tuanHoc: Types.ObjectId(dto.tuanHoc),
            thuTiet: dto.thuTiet,
            thoiGian_batDau: dto.thoiGian_batDau,
            ngayHoc: dto.ngayHoc,
            diemDanh: [],
        });
    }

    async findAll() {
        const all = await this.model.find({});
        const result = [];
        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne(all[i]._id));
        }
        return result;
    }

    async findOne(tiet: string | TietHoc) {
        const dd = [];
        const cl = await (
            await this.model.findById(tiet)
        )
            .populate([
                { path: 'giaoVien', model: 'nguoi_dung' },
                { path: 'monHoc', model: 'mon_hoc' },
                { path: 'lopHoc', model: 'lop_hoc' },
                { path: 'tuanHoc', model: 'tuan_hoc' },
            ])
            .execPopulate();

        for (let i = 0; i < cl.diemDanh.length; i++) {
            dd.push(await this.ddSer.findOne(cl.diemDanh[i]));
        }

        return {
            id: tiet,
            thuTiet: cl.thuTiet,
            thoiGian: cl.thoiGian_batDau,
            ngayHoc: cl.ngayHoc,
            giaoVien: cl.giaoVien.hoTen,
            monHoc: cl.monHoc.tenMH,
            lopHoc: cl.lopHoc.maLH,
            tuanHoc: cl.tuanHoc.soTuan,
            diemDanh: dd,
        };
    }

    async update(id: string, dto: UpdateTietHocDto) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    lopHoc: await this.lhSer.objectify_fromID(dto.lopHoc),
                    giaoVien: await this.ndSer.objectify(dto.giaoVien),
                    monHoc: await this.mhSer.objectify(dto.monHoc),
                    tuanHoc: await this.tuanSer.objectify(dto.tuanHoc),
                    thuTiet: dto.thuTiet,
                    thoiGian_batDau: dto.thoiGian_batDau,
                    ngayHoc: dto.ngayHoc,
                    diemDanh: await this.ddSer.bulkObjectify(dto.diemDanh),
                },
            },
            { new: true },
        );
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
