import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign } from '../../helpers/utilities';
import { DiemDanhService } from '../diem-danh/diem-danh.service';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { CreateTietHocDto } from './dto/create-tiet-hoc.dto';
import { UpdateTietHocDto } from './dto/update-tiet-hoc.dto';
import { TietHoc, TietHocDocument } from './tiet-hoc.entity';

@Injectable()
export class TietHocService {
    constructor(
        @InjectModel('tiet_hoc') private model: Model<TietHocDocument>,
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
            thuTiet: dto.thuTiet,
            thoiGian_batDau: dto.thoiGian_batDau,
            diemDanh: [],
        });
    }

    async findAll() {
        const all = await this.model.find();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne(all[i]._id));
        }
        return result;
    }

    async findOne(tiet: string | TietHoc) {
        const dd = [];
        const org = await this.model.findById(tiet);
        const cl = await (
            await this.model.findById(tiet)
        )
            .populate([
                { path: 'giaoVien', model: 'nguoi_dung' },
                { path: 'monHoc', model: 'mon_hoc' },
                { path: 'lopHoc', model: 'lop_hoc' },
            ])
            .execPopulate();

        for (let i = 0; i < cl.diemDanh.length; i++) {
            dd.push(await this.ddSer.findOne(cl.diemDanh[i]));
        }

        return {
            id: tiet,
            thuTiet: cl.thuTiet,
            thoiGian: cl.thoiGian_batDau,
            giaoVien: cl.giaoVien.hoTen,
            monHoc: cl.monHoc.tenMH,
            lopHoc: {
                id: org.lopHoc,
                maLH: cl.lopHoc ? cl.lopHoc.maLH : null,
            },
            diemDanh: dd,
        };
    }

    async update(id: string, dto: UpdateTietHocDto) {
        const { lopHoc, giaoVien, monHoc, diemDanh, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (lopHoc) doc.lopHoc = await this.lhSer.objectify_fromID(lopHoc);
            if (giaoVien) doc.giaoVien = await this.ndSer.objectify(giaoVien);
            if (monHoc) doc.monHoc = await this.mhSer.objectify(monHoc);
            if (diemDanh)
                doc.diemDanh = await this.ddSer.bulkObjectify(diemDanh);
            assign(rest, doc);
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
