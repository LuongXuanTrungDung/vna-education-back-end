import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { Model, Types } from 'mongoose';
import { RoleType } from '../../helpers/utilities';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { NguoiDungDocument } from './nguoi-dung.entity';

@Injectable()
export class NguoiDungService {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
        @Inject(forwardRef(() => LopHocService))
        private readonly lhSer: LopHocService,
    ) {}

    async create(dto: CreateNguoiDungDto) {
        const {
            cccd,
            ngayCap,
            noiCap,
            tDCM,
            chucVu,
            hopDong,
            matKhau,
            lopHoc,
            chuNhiem,
            conCai,
            ...rest
        } = dto;
        const salt = await genSalt(10);
        let result = {
            ...rest,
            matKhau: await hash(matKhau, salt),
        };
        const temp = [];

        if (lopHoc)
            result = Object.assign(result, {
                lopHoc: await this.lhSer.objectify_fromName(lopHoc),
            });

        if (chuNhiem)
            result = Object.assign(result, {
                chuNhiem: await this.lhSer.objectify_fromName(chuNhiem),
            });

        if (cccd && ngayCap && noiCap)
            result = Object.assign(result, {
                cccd: {
                    maSo: cccd,
                    ngayCap: ngayCap,
                    noiCap: noiCap,
                },
            });

        if (chucVu && hopDong && tDCM)
            result = Object.assign(result, {
                chucVu: {
                    chucVu: chucVu,
                    hopDong: hopDong,
                    trinhDo: tDCM,
                },
            });

        if (conCai) {
            for (let i = 0; i < conCai.length; i++) {
                temp.push(Types.ObjectId(conCai[i]));
            }
            result = Object.assign(result, { conCai: temp });
        }

        return await this.model.create(result).then(async (doc) => {
            return { ...doc, _id: doc._id };
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

    async findAll_byRole(role: RoleType) {
        const reg = new RegExp(role, 'i');
        return await this.model.find({ maND: reg });
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
                noiSinh: user.noiSinh,
                gioiTinh: user.gioiTinh,
                soDienThoai: user.soDienThoai ? user.soDienThoai : null,
                dangHoatDong: user.dangHoatDong,
                quocTich: user.quocTich,
                danToc: user.danToc,
                cccd: user.cccd
                    ? {
                          maSo: user.cccd.maSo,
                          ngayCap: user.cccd.ngayCap,
                          noiCap: user.cccd.noiCap,
                      }
                    : null,
                hoChieu: user.hoChieu
                    ? {
                          maSo: user.hoChieu.maSo,
                          ngayCap: user.hoChieu.ngayCap,
                          noiCap: user.hoChieu.noiCap,
                      }
                    : null,
                ngayNhapHoc: user.ngayNhapHoc ? user.ngayNhapHoc : null,
                lopHoc: user.lopHoc ? user.lopHoc.maLH : null,
                chuNhiem: user.chuNhiem ? user.chuNhiem.maLH : null,
                chucVu: user.chucVu ? {
					chucVu: user.chucVu.chucVu,
					hopDong: user.chucVu.hopDong,
					trinhDo: user.chucVu.trinhDo
				} : null,
                conCai:
                    user.conCai && user.conCai.length > 0 ? user.conCai : null,
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
        return await this.model.findById(id, null, null, (err, doc) => {
            if (err) {
                console.log(err);
                return null;
            } else return doc;
        });
    }

    async update(id: string, dto: UpdateNguoiDungDto) {
        let gt, ld;
        const salt = await genSalt(10);

        if (dto.cccd && dto.ngayCap && dto.noiCap) {
            gt = {
                maSo: dto.cccd,
                ngayCap: dto.ngayCap,
                noiCap: dto.noiCap,
            };
        } else gt = null;

        if (dto.chucVu && dto.hopDong && dto.tDCM) {
            ld = {
                chucVu: dto.chucVu,
                hopDong: dto.hopDong,
                trinhDo: dto.tDCM,
            };
        } else ld = null;

        await this.getOne(id).then(async (doc) => {
            if (dto.maND) doc.maND = dto.maND;
            if (dto.hoTen) doc.hoTen = dto.hoTen;
            if (dto.matKhau) doc.matKhau = await hash(dto.matKhau, salt);
            if (dto.emailND) doc.emailND = dto.emailND;
            if (dto.soDienThoai) doc.soDienThoai = dto.soDienThoai;
            if (dto.quocTich) doc.quocTich = dto.quocTich;
            if (dto.danToc) doc.danToc = dto.danToc;
            if (dto.diaChi) doc.diaChi = dto.diaChi;
            if (dto.gioiTinh) doc.gioiTinh = dto.gioiTinh;
            if (dto.ngaySinh) doc.ngaySinh = dto.ngaySinh;
            if (dto.ngayNhapHoc) doc.ngayNhapHoc = dto.ngayNhapHoc;
            if (dto.dangHoatDong) doc.dangHoatDong = dto.dangHoatDong;
            if (dto.conCai && dto.conCai.length > 0) {
                const temp = [];
                for (let i = 0; i < dto.conCai.length; i++) {
                    temp.push((await this.getOne(dto.conCai[i]))._id);
                }
                doc.conCai = temp;
            }
            if (dto.lopHoc)
                doc.lopHoc = (await this.lhSer.findOne(dto.lopHoc))._id;
            if (dto.chuNhiem)
                doc.chuNhiem = (await this.lhSer.findOne(dto.chuNhiem))._id;
            if (gt) doc.cccd = gt;
            if (ld) doc.chucVu = ld;
            await doc.save();
        });
        return await this.findOne_byID(id);
    }

    async check(user: string) {
        return (await this.getOne(user)) ? true : false;
    }

    async objectify(user: string) {
        return (await this.getOne(user))._id;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
