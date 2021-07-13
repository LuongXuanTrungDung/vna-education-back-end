import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BangDiemTongDocument } from './bang-diem-tong.entity';
import { CreateBangDiemTongDto } from './dto/create-bang-diem-tong.dto';
import { UpdateBangDiemTongDto } from './dto/update-bang-diem-tong.dto';

@Injectable()
export class BangDiemTongService {
    constructor(
        @InjectModel('bang_diem_tong')
        private model: Model<BangDiemTongDocument>,
    ) {}

    async create(dto: CreateBangDiemTongDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        const bd = await (
            await this.model.findById(id)
        )
            .populate([
                {
                    path: 'GVCN',
                    model: 'nguoi_dung',
                },
                {
                    path: 'hocSinh',
                    model: 'nguoi_dung',
                },
            ])
            .execPopulate();
        return {
            hocSinh: bd.hocSinh.hoTen,
            GVCN: bd.GVCN.hoTen,
            hocKy1: bd.hocKy1,
            hocKy2: bd.hocKy2,
            TBcacMon: bd.diemTB_cacMon,
            xepLoai: bd.xepLoai,
            nhanXet: bd.nhanXet,
        };
    }

    async update(id: string, dto: UpdateBangDiemTongDto) {
        return await this.model.findByIdAndUpdate(id, dto);
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
