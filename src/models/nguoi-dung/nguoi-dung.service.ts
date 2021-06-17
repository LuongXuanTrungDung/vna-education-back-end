import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { NguoiDungDocument } from './nguoi-dung.entity';

@Injectable()
export class NguoiDungService {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
    ) {}

    async create(dto: CreateNguoiDungDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findAll_byRole(role: string) {
        const reg = new RegExp(role, 'i');
        return await this.model.find({ maND: reg });
    }

    async findOne_byMaND(ma: string) {
        return await this.model.findOne({ maND: ma });
    }

    async findOne_byID(id: string) {
        const user = await this.model.findById(id);
        const rest = {
            id: user._id,
            ma: user.maND,
            hoTen: user.hoTen,
            diaChi: user.diaChi,
            ngaySinh: () => {
                return (
                    user.ngaySinh.getDate() +
                    '-' +
                    user.ngaySinh.getMonth() +
                    '-' +
                    user.ngaySinh.getFullYear()
                );
            },
            gioiTinh: user.gioiTinh,
            quocTich: user.quocTich,
            danToc: user.danToc,
            cccd: user.cccd,
            hoChieu: user.hoChieu,
            lop: user.lopHoc,
            nhapHoc: user.ngayNhapHoc,
            chuNhiem: user.chuNhiem,
            chucVu: user.chucVu,
            danhGia: user.danhGia,
        };
        return rest;
    }

    async onlyPassword(ma: string) {
        return (await this.model.findOne({ maND: ma })).matKhau;
    }

    async update(id: string, dto: UpdateNguoiDungDto) {
        return await this.model.findOneAndUpdate({ maND: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maND: id });
    }
}
