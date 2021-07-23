import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RoleType } from '../../helpers/utilities';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { NguoiDungDto } from './dto/nguoi-dung.dto';
import { NguoiDung, NguoiDungDocument } from './nguoi-dung.entity';

@Injectable()
export class NguoiDungService {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
        @Inject(forwardRef(() => LopHocService))
        private readonly lhSer: LopHocService,
    ) {}

    async create(dto: NguoiDungDto) {
        const {
            cccd,
            ngayCap,
            noiCap,
            tDCM,
            chucVu,
            hopDong,
            lopHoc,
            chuNhiem,
            conCai,
            ...rest
        } = dto;
        let result = {
            ...rest,
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

        return await this.model.create(result);
    }

    // async bulkCreate(dto: ImportNguoiDungDto) {
    //     const toImport = [];

    //     for (let i = 0; i < dto.maND.length; i++) {
    //         let result = {
    //             maND: dto.maND[i],
    //             hoTen: dto.hoTen[i],
    //             dangHoatDong: dto.dangHoatDong[i],
    //             emailND: dto.emailND[i],
    //             soDienThoai: dto.soDienThoai[i],
    //             noiSinh: dto.noiSinh[i],
    //             ngaySinh: dto.ngaySinh[i],
    //             danToc: dto.danToc[i],
    //             quocTich: dto.quocTich[i],
    //             diaChi: dto.diaChi[i],
    //             gioiTinh: dto.gioiTinh[i],
    //             matKhau: dto.matKhau[i],
    //         };

    //         if (dto.cccd[i] && dto.ngayCap[i] && dto.noiCap[i])
    //             result = Object.assign(result, {
    //                 cccd: {
    //                     maSo: dto.cccd[i],
    //                     ngayCap: dto.ngayCap[i],
    //                     noiCap: dto.noiCap[i],
    //                 },
    //             });

    //         if (dto.maND[i].substring(0, 2) === 'HS') {
    //             if (dto.lopHoc[i])
    //                 result = Object.assign(result, {
    //                     lopHoc: await this.lhSer.objectify_fromName(
    //                         dto.lopHoc[i],
    //                     ),
    //                 });
    //         }

    //         if (dto.maND[i].substring(0, 2) === 'GV') {
    //             if (dto.chuNhiem[i])
    //                 result = Object.assign(result, {
    //                     chuNhiem: await this.lhSer.objectify_fromName(
    //                         dto.chuNhiem[i],
    //                     ),
    //                 });
    //         }

    //         if (dto.chucVu[i] && dto.hopDong[i] && dto.tDCM[i])
    //             result = Object.assign(result, {
    //                 chucVu: {
    //                     chucVu: dto.chucVu[i],
    //                     hopDong: dto.hopDong[i],
    //                     trinhDo: dto.tDCM[i],
    //                 },
    //             });

    //         toImport.push(result);
    //     }

    //     return await this.model.insertMany(toImport);
    // }

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

    async findAll() {
        const all = await this.model.find();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne_byID(all[i]._id));
        }
        return result;
    }

    async findAll_byRole(role: RoleType) {
        const reg =
            role === 'QT-HT' ? new RegExp('QT|HT', 'i') : new RegExp(role, 'i');
        return await this.model.find({ maND: reg });
    }

    async findOne_byMaND(ma: string) {
        return await this.model.findOne({ maND: ma });
    }

    async findOne_byID(nd: string | NguoiDung) {
        const user = await (
            await this.model.findById(nd)
        )
            .populate({
                path: 'chuNhiem',
                model: 'lop_hoc',
            })
            .execPopulate();
        const cl = user.lopHoc ? await this.lhSer.findOne(user.lopHoc) : null;

        return {
            id: nd,
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
            hocTap: cl
                ? {
                      idLop: cl.id,
                      ngayNhapHoc: user.ngayNhapHoc,
                      GVCN: cl.GVCN,
                      lopHoc: cl.maLH,
                  }
                : null,
            chuNhiem: user.chuNhiem ? user.chuNhiem.maLH : null,
            chucVu: user.chucVu
                ? {
                      chucVu: user.chucVu.chucVu,
                      hopDong: user.chucVu.hopDong,
                      trinhDo: user.chucVu.trinhDo,
                  }
                : null,
            conCai: user.conCai && user.conCai.length > 0 ? user.conCai : null,
        };
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

    async update(id: string, dto: NguoiDungDto) {
        const {
            cccd,
            ngayCap,
            noiCap,
            chuNhiem,
            chucVu,
            conCai,
            hopDong,
            tDCM,
            lopHoc,
            ...rest
        } = dto;
        const temp = [];
        let gt, ld;

        if (cccd && ngayCap && noiCap) {
            gt = {
                maSo: dto.cccd,
                ngayCap: dto.ngayCap,
                noiCap: dto.noiCap,
            };
        }

        if (chucVu && hopDong && tDCM) {
            ld = {
                chucVu: dto.chucVu,
                hopDong: dto.hopDong,
                trinhDo: dto.tDCM,
            };
        }

        if (conCai && conCai.length > 0) {
            for (let i = 0; i < conCai.length; i++) {
                temp.push(await this.objectify(conCai[i]));
            }
        }

        return await this.model.findByIdAndUpdate(
            id,
            {
                ...rest,
                $set: {
                    lopHoc: await this.lhSer.objectify_fromID(lopHoc),
                    chuNhiem: await this.lhSer.objectify_fromID(chuNhiem),
                    cccd: gt,
                    chucVu: ld,
                    conCai: temp,
                },
            },
            { new: true },
        );
    }

    async check(user: string) {
        return (await this.getOne(user)) ? true : false;
    }

    async objectify(user: string) {
        return (await this.getOne(user))._id;
    }

    async bulkObjectify(user: string[]) {
        const result = [];
        for (let i = 0; i < user.length; i++) {
            result.push(await this.objectify(user[i]));
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
