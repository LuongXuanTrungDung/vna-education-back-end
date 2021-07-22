import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { DiemDanh, DiemDanhDocument } from './diem-danh.entity';
import { CreateDiemDanhDto } from './dto/create-diem-danh.dto';
import { UpdateDiemDanhDto } from './dto/update-diem-danh.dto';

@Injectable()
export class DiemDanhService {
    constructor(
        @InjectModel('diem_danh') private model: Model<DiemDanhDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}
    async create(dto: CreateDiemDanhDto) {
        return await this.model.create({
            hocSinh: Types.ObjectId(dto.hocSinh),
            trangThai: dto.trangThai,
            ghiChu: dto.ghiChu,
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

    async findOne(dd: string | DiemDanh) {
        const one = await (await this.model.findById(dd))
            .populate({ path: 'hocSinh', model: 'nguoi_dung' })
            .execPopulate();

        return {
            id: dd,
            hocSinh: one.hocSinh.hoTen,
            trangThai: one.trangThai,
            ghiChu: one.ghiChu,
        };
    }

    async update(id: string, dto: UpdateDiemDanhDto) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    hocSinh: await this.ndSer.objectify(dto.hocSinh),
                    trangThai: dto.trangThai,
                    ghiChu: dto.ghiChu,
                },
            },
            { new: true },
        );
    }

    async objectify(id: string) {
        return (await this.model.findById(id))._id;
    }

    async bulkObjectify(dd: string[]) {
        const result = [];
        for (let i = 0; i < dd.length; i++) {
            result.push(await this.objectify(dd[i]));
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
