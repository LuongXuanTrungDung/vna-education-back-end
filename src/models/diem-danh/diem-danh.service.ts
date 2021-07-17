import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { DiemDanhDocument } from './diem-danh.entity';
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
        return await this.model.find({});
    }

    async findOne(id: string) {
        const one = await (await this.model.findById(id))
            .populate({ path: 'hocSinh', model: 'nguoi_dung' })
            .execPopulate();

        return {
            id: one._id,
            hocSinh: one.hocSinh.hoTen,
            trangThai: one.trangThai,
            ghiChu: one.ghiChu,
        };
    }

    async update(id: string, dto: UpdateDiemDanhDto) {
        await this.model.findById(id).then(async (doc) => {
            if (dto.hocSinh)
                doc.hocSinh = await this.ndSer.objectify(dto.hocSinh);
            if (dto.trangThai) doc.trangThai = dto.trangThai;
            if (dto.ghiChu) doc.ghiChu = dto.ghiChu;
            await doc.save();
        });
        return await this.findOne(id);
    }

    async objectify(id: string) {
        return (await this.model.findById(id))._id;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
