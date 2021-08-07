import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hashSync } from 'bcrypt';
import { isValidObjectId, Model, Types } from 'mongoose';
import { assign, bulkObjectID, RoleType } from '../../helpers/utilities';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { ChangePassDTO } from '../../helpers/changePass.dto';
import { NguoiDungDto } from './nguoi-dung.dto';
import { NguoiDungDocument } from './nguoi-dung.entity';

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
            matKhau,
            ...rest
        } = dto;
        let result = {
            ...rest,
            matKhau: hashSync(matKhau, 10),
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

    async bulkCreate(dto: NguoiDungDto[]) {
        for (let i = 0; i < dto.length; i++) {
            await this.create(dto[i]);
        }

        const latest = await this.model
            .find()
            .sort({ _id: -1 })
            .limit(dto.length);
        const result = [];

        for (let i = 0; i < latest.length; i++) {
            result.push(await this.findOne_byID(latest[i]._id));
        }
        return result;
    }

    async findAll(condition: any = {}) {
        const all = await this.model
            .find(condition)
            .populate([
                {
                    path: 'chuNhiem',
                    select: 'maLH',
                },
                {
                    path: 'lopHoc',
                    select: 'maLH',
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                maND: all[i].maND,
                hoTen: all[i].hoTen,
                emailND: all[i].emailND,
                diaChi: all[i].diaChi,
                ngaySinh: all[i].ngaySinh,
                noiSinh: all[i].noiSinh,
                gioiTinh: all[i].gioiTinh,
                soDienThoai: all[i].soDienThoai ? all[i].soDienThoai : null,
                dangHoatDong: all[i].dangHoatDong,
                quocTich: all[i].quocTich,
                danToc: all[i].danToc,
                cccd: all[i].cccd
                    ? {
                          maSo: all[i].cccd.maSo,
                          ngayCap: all[i].cccd.ngayCap,
                          noiCap: all[i].cccd.noiCap,
                      }
                    : null,
                hoChieu: all[i].hoChieu
                    ? {
                          maSo: all[i].hoChieu.maSo,
                          ngayCap: all[i].hoChieu.ngayCap,
                          noiCap: all[i].hoChieu.noiCap,
                      }
                    : null,
                lopHoc: all[i].lopHoc
                    ? {
                          _id: all[i].populated('lopHoc'),
                          maLH: all[i].lopHoc.maLH,
                      }
                    : null,
                ngayNhapHoc: all[i].ngayNhapHoc ? all[i].ngayNhapHoc : null,
                chuNhiem: all[i].chuNhiem
                    ? {
                          _id: all[i].populated('chuNhiem'),
                          maLH: all[i].chuNhiem,
                      }
                    : null,
                chucVu: all[i].chucVu
                    ? {
                          chucVu: all[i].chucVu.chucVu,
                          hopDong: all[i].chucVu.hopDong,
                          trinhDo: all[i].chucVu.trinhDo,
                      }
                    : null,
            });
        }
        return result;
    }

    async getAll(condition: any = {}) {
        const all = await this.model
            .find(condition)
            .populate([
                {
                    path: 'chuNhiem',
                    select: 'maLH',
                },
                {
                    path: 'lopHoc',
                    select: 'maLH',
                },
            ])
            .exec();
        const result = [];
        for (let i = 0; i < all.length; i++) {
            result.push({
                maND: all[i].maND,
                hoTen: all[i].hoTen,
                emailND: all[i].emailND,
                diaChi: all[i].diaChi,
                ngaySinh: all[i].ngaySinh,
                noiSinh: all[i].noiSinh,
                gioiTinh: all[i].gioiTinh,
                soDienThoai: all[i].soDienThoai ? all[i].soDienThoai : null,
                dangHoatDong: all[i].dangHoatDong,
                quocTich: all[i].quocTich,
                danToc: all[i].danToc,
                cccd: all[i].cccd
                    ? {
                          maSo: all[i].cccd.maSo,
                          ngayCap: all[i].cccd.ngayCap,
                          noiCap: all[i].cccd.noiCap,
                      }
                    : null,
                hoChieu: all[i].hoChieu
                    ? {
                          maSo: all[i].hoChieu.maSo,
                          ngayCap: all[i].hoChieu.ngayCap,
                          noiCap: all[i].hoChieu.noiCap,
                      }
                    : null,
                ngayNhapHoc: all[i].ngayNhapHoc ? all[i].ngayNhapHoc : null,
                lopHoc: all[i].lopHoc ? all[i].lopHoc.maLH : null,
                chuNhiem: all[i].chuNhiem ? all[i].chuNhiem.maLH : null,
                chucVu: all[i].chucVu
                    ? {
                          chucVu: all[i].chucVu.chucVu,
                          hopDong: all[i].chucVu.hopDong,
                          trinhDo: all[i].chucVu.trinhDo,
                      }
                    : null,
            });
        }
        return;
    }

    async findAll_byRole(role: RoleType) {
        const reg =
            role === 'QT-HT' ? new RegExp('QT|HT', 'i') : new RegExp(role, 'i');
        return await this.findAll({ maND: reg });
    }

    async groupInfo(group: string[]) {
        return await this.model.aggregate([
            {
                $match: { _id: { $all: bulkObjectID(group) } },
            },
            {
                $project: {
                    maND: 1,
                    hoTen: 1,
                },
            },
        ]);
    }

    async quickInfo(user: string) {
        return await this.model.aggregate([
            {
                $match: { _id: Types.ObjectId(user) },
            },
            {
                $project: {
                    maND: 1,
                    hoTen: 1,
                },
            },
        ]);
    }

    async findAll_byClass(lop: string) {
        return await this.getAll({ lopHoc: Types.ObjectId(lop) });
    }

    async findOne_byMaND(ma: string) {
        return await this.model.findOne({ maND: ma });
    }

    async getOne_byID(nd: string) {
        const user = await (
            await this.model.findById(nd)
        )
            .populate([
                {
                    path: 'chuNhiem',
                    select: 'maLH',
                },
                {
                    path: 'lopHoc',
                    select: ['maLH', 'GVCN'],
                    populate: {
                        path: 'GVCN',
                        select: 'hoTen',
                    },
                },
            ])
            .execPopulate();

        return {
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
            hocTap: user.lopHoc
                ? {
                      idLop: user.populated('lopHoc'),
                      ngayNhapHoc: user.ngayNhapHoc,
                      GVCN: user.lopHoc.GVCN.hoTen,
                      lopHoc: user.lopHoc.maLH,
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
        };
    }

    async findOne_byID(nd: string) {
        const user = await (
            await this.model.findById(nd)
        )
            .populate([
                {
                    path: 'chuNhiem',
                    select: 'maLH',
                },
                {
                    path: 'lopHoc',
                    select: 'maLH',
                },
            ])
            .execPopulate();

        return {
            _id: nd,
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
            lopHoc: user.lopHoc
                ? {
                      _id: user.populated('lopHoc'),
                      maLH: user.lopHoc,
                  }
                : null,
            chuNhiem: user.chuNhiem
                ? {
                      _id: user.populated('chuNhiem'),
                      maLH: user.chuNhiem,
                  }
                : null,
            chucVu: user.chucVu
                ? {
                      chucVu: user.chucVu.chucVu,
                      hopDong: user.chucVu.hopDong,
                      trinhDo: user.chucVu.trinhDo,
                  }
                : null,
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
            matKhau,
            ...rest
        } = dto;
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

        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;

            assign(rest, doc);
            if (matKhau) doc.matKhau = hashSync(matKhau, 10);
            if (gt) doc.cccd = gt;
            if (ld) doc.chucVu = ld;

            if (lopHoc) doc.lopHoc = await this.lhSer.objectify_fromID(lopHoc);
            if (chuNhiem)
                doc.chuNhiem = await this.lhSer.objectify_fromID(chuNhiem);
            if (conCai) doc.conCai = await this.bulkObjectify(conCai);

            await doc.save();
        });
    }

    async changePass(dto: ChangePassDTO) {
        if (!isValidObjectId(dto.idUser))
            return {
                msg: '_id người dùng không hợp lệ',
                checkOK: false,
            };

        const user = await this.model.aggregate([
            { $match: { _id: Types.ObjectId(dto.idUser) } },
            {
                $project: {
                    maND: 1,
                    matKhau: 1,
                },
            },
        ]);

        if (user[0]) {
            if (await compare(dto.oldPass, user[0].matKhau)) {
                await this.model.findByIdAndUpdate(
                    user[0]._id,
                    { $set: { matKhau: hashSync(dto.newPass, 10) } },
                    { new: true },
                );
                return {
                    msg: 'Đổi mật khẩu thành công!',
                    checkOK: true,
                };
            } else
                return {
                    msg: 'Mật khẩu cũ không đúng!',
                    checkOK: false,
                };
        } else
            return {
                msg: 'Người dùng không tồn tại!',
                checkOK: false,
            };
    }

    async objectify(user: string) {
        return (await this.model.findById(user))._id;
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
