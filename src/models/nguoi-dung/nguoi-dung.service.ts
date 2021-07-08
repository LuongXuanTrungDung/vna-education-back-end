import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { GiayTo } from './giayTo.schema';
import { LaoDong } from './laoDong.schema';
import { NguoiDungDocument } from './nguoi-dung.entity';

@Injectable()
export class NguoiDungService {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
    ) {}

    async create(dto: CreateNguoiDungDto) {
        const {
            cccd,
            ngayCap,
            noiCap,
            tDCM,
            chucVu,
            nhomChucVu,
            matKhau,
            ...rest
        } = dto;
        let gt, ld;
        if (dto.cccd && dto.ngayCap && dto.noiCap) {
            gt = {
                maSo: dto.cccd,
                ngayCap: dto.ngayCap,
                noiCap: dto.noiCap,
            };
        }

        if (dto.chucVu && dto.nhomChucVu && dto.tDCM) {
            ld = {
                chucVu: dto.chucVu,
                nhomChucVu: dto.nhomChucVu,
                trinhDo: dto.tDCM,
            };
        }

        return await this.model.create({
            ...rest,
            matKhau: await hash(dto.matKhau, 12),
            cccd: gt,
            chucVu: ld,
        });
    }

    async forSelect_giaoVien() {
        const result = [];
        const gv = await this.findAll_byRole('GV');
        for (let i = 0; i < gv.length; i++) {
            result.push({
                id: gv[i]._id,
                ten: gv[i].hoTen,
            });
        }
        return result;
    }

    async forSelect_hocSinh() {
        const result = [];
        const hs = await this.findAll_byRole('HS');
        for (let i = 0; i < hs.length; i++) {
            result.push({
                id: hs[i]._id,
                ten: hs[i].hoTen,
            });
        }
        return result;
    }

    async findAll() {
        return await this.model.find({});
    }

    async findAll_byRole(role: string) {
        if (
            role == 'HS' ||
            role == 'PH' ||
            role == 'GV' ||
            role == 'QT' ||
            role == 'HT'
        ) {
            const reg = new RegExp(role, 'i');
            return await this.model.find({ maND: reg });
        } else return null;
    }

    async findOne_byMaND(ma: string) {
        return await this.model.findOne({ maND: ma });
    }

    async findOne_byID(id: string) {
        const nd = await this.model.findById(id, null, null, (err, doc) => {
            if (err) return null;
            else return doc;
        });
        if (nd) {
            const user = await nd
                .populate([
                    {
                        path: 'lopHoc',
                        model: 'lop_hoc',
                    },
                    {
                        path: 'chuNhiem',
                        model: 'lop_hoc',
                    },
                ])
                .execPopulate();
            return {
                id: id,
                maND: user.maND,
                hoTen: user.hoTen,
                emailND: user.emailND,
                diaChi: user.diaChi,
                ngaySinh: user.ngaySinh,
                gioiTinh: user.gioiTinh,
                soDienThoai: user.soDienThoai ? user.soDienThoai : null,
                quocTich: user.quocTich,
                danToc: user.danToc,
                cccd: user.cccd ? user.cccd : null,
                hoChieu: user.hoChieu ? user.hoChieu : null,
                ngayNhapHoc: user.ngayNhapHoc ? user.ngayNhapHoc : null,
                lopHoc: user.lopHoc ? user.lopHoc.maLH : null,
                chuNhiem: user.chuNhiem ? user.chuNhiem.maLH : null,
                chucVu: user.chucVu ? user.chucVu : null,
            };
        } else return null;
    }

    async onlyPassword(ma: string) {
        const user = await this.model.findOne(
            { maND: ma },
            null,
            null,
            (err, doc) => {
                if (err) return null;
                else return doc;
            },
        );
        if (user) return user.matKhau;
        else return null;
    }

    async getOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: UpdateNguoiDungDto) {
        const {
            cccd,
            ngayCap,
            noiCap,
            tDCM,
            chucVu,
            nhomChucVu,
            matKhau,
            ...rest
        } = dto;
        let gt, ld;
        if (dto.cccd && dto.ngayCap && dto.noiCap) {
            gt = {
                maSo: dto.cccd,
                ngayCap: dto.ngayCap,
                noiCap: dto.noiCap,
            };
        }

        if (dto.chucVu && dto.nhomChucVu && dto.tDCM) {
            ld = {
                chucVu: dto.chucVu,
                nhomChucVu: dto.nhomChucVu,
                trinhDo: dto.tDCM,
            };
        }

        await this.getOne(id).then(async (doc) => {
            if (dto.maND) doc.maND = dto.maND;
            if (dto.hoTen) doc.hoTen = dto.hoTen;
            if (dto.matKhau) doc.matKhau = await hash(dto.matKhau, 12);
            if (dto.emailND) doc.emailND = dto.emailND;
            if (dto.soDienThoai) doc.soDienThoai = dto.soDienThoai;
            if (dto.quocTich) doc.quocTich = dto.quocTich;
            if (dto.danToc) doc.danToc = dto.danToc;
            if (dto.diaChi) doc.diaChi = dto.diaChi;
            if (dto.gioiTinh) doc.gioiTinh = dto.gioiTinh;
            if (dto.ngaySinh) doc.ngaySinh = dto.ngaySinh;
            if (dto.ngayNhapHoc) doc.ngayNhapHoc = dto.ngayNhapHoc;
            if (gt) doc.cccd = gt;
            if (ld) doc.chucVu = ld;
            await doc.save();
        });
        return 'Cập nhật thành công';
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
