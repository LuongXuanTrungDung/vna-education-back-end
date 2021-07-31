import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { DiemDanhDto } from './diem-danh.dto';
import { DiemDanh, DiemDanhDocument } from './diem-danh.entity';

@Injectable()
export class DiemDanhService {
    constructor(
        @InjectModel('diem_danh') private model: Model<DiemDanhDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: DiemDanhDto) {
        return await this.model.create({
            hocSinh: Object(dto.hocSinh),
            trangThai: dto.trangThai,
            ghiChu: dto.ghiChu,
        });
    }

    async findAll() {
        const all = await this.model
            .find()
            .populate({ path: 'hocSinh', select: 'hoTen' })
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                hocSinh: all[i].hocSinh.hoTen,
                trangThai: all[i].trangThai,
                ghiChu: all[i].ghiChu,
            });
        }
        return result;
    }

    async findOne(dd: string) {
        const one = await (await this.model.findById(dd))
            .populate({ path: 'hocSinh', select: 'hoTen' })
            .execPopulate();

        return {
            id: dd,
            hocSinh: {
                id: one.hocSinh,
                hoTen: one.hocSinh.hoTen,
            },
            trangThai: one.trangThai,
            ghiChu: one.ghiChu,
        };
    }

    async update(id: string, dto: DiemDanhDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;

            if (dto.hocSinh) doc.hocSinh = Object(dto.hocSinh);
            if (dto.trangThai) doc.trangThai = dto.trangThai;
            if (dto.ghiChu) doc.trangThai = dto.trangThai;

            await doc.save();
        });
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
