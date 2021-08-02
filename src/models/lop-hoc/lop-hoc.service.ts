import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { bulkObjectID, diff } from '../../helpers/utilities';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { LopHocDto } from './lop-hoc.dto';
import { LopHoc, LopHocDocument } from './lop-hoc.entity';

@Injectable()
export class LopHocService {
    constructor(
        @InjectModel('lop_hoc') private model: Model<LopHocDocument>,
        @Inject(forwardRef(() => NguoiDungService))
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: LopHocDto) {
        return await this.model.create({
            maLH: dto.maLH,
            GVCN: Types.ObjectId(dto.GVCN),
            hocSinh: bulkObjectID(dto.hocSinh),
        });
    }

    async findAll(condition: any = {}) {
        const all = await this.model
            .find(condition)
            .populate([
                { path: 'GVCN', select: 'hoTen' },
                { path: 'hocSinh', select: 'hoTen' },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                maLH: all[i].maLH,
                GVCN: all[i].GVCN,
                hocSinh: all[i].hocSinh,
            });
        }
        return result;
    }

    async findOne(lop: string | LopHoc) {
        const classe = await (
            await this.model.findById(lop)
        )
            .populate([
                { path: 'GVCN', model: 'nguoi_dung' },
                { path: 'hocSinh', model: 'nguoi_dung' },
            ])
            .execPopulate();
        const hs = [];

        if (classe.hocSinh) {
            if (classe.hocSinh.length > 0) {
                for (let i = 0; i < classe.hocSinh.length; i++) {
                    hs.push(classe.hocSinh[i].hoTen);
                }
            }
        }

        return {
            id: lop,
            maLH: classe.maLH ? classe.maLH : null,
            GVCN: classe.GVCN ? classe.GVCN.hoTen : null,
            hocSinh: hs,
        };
    }

    async addHS(hs: string[], lop: string) {
        const students = await this.ndSer.bulkObjectify(hs);
        const classe = (await this.model.findById(lop)).hocSinh;
        const result = diff(classe, students);

        return await this.model.findByIdAndUpdate(lop, {
            $push: { hocSinh: { $each: result } },
        });
    }

    async onlyHS(lop: string) {
        const result = [];
        const p = await (await this.model.findById(lop))
            .populate({ path: 'hocSinh', model: 'nguoi_dung' })
            .execPopulate();

        for (let i = 0; i < p.hocSinh.length; i++) {
            result.push({
                _id: p.populated('hocSinh')[i],
                maND: p.hocSinh[i].maND,
                hoTen: p.hocSinh[i].hoTen,
                // emailND: p.hocSinh[i].emailND,
                // diaChi: p.hocSinh[i].diaChi,
                // ngaySinh: p.hocSinh[i].ngaySinh,
                // noiSinh: p.hocSinh[i].noiSinh,
                // gioiTinh: p.hocSinh[i].gioiTinh,
                // soDienThoai: p.hocSinh[i].soDienThoai
                //     ? p.hocSinh[i].soDienThoai
                //     : null,
                // dangHoatDong: p.hocSinh[i].dangHoatDong,
                // quocTich: p.hocSinh[i].quocTich,
                // danToc: p.hocSinh[i].danToc,
                // cccd: p.hocSinh[i].cccd
                //     ? {
                //           maSo: p.hocSinh[i].cccd.maSo,
                //           ngayCap: p.hocSinh[i].cccd.ngayCap,
                //           noiCap: p.hocSinh[i].cccd.noiCap,
                //       }
                //     : null,
                // hoChieu: p.hocSinh[i].hoChieu
                //     ? {
                //           maSo: p.hocSinh[i].hoChieu.maSo,
                //           ngayCap: p.hocSinh[i].hoChieu.ngayCap,
                //           noiCap: p.hocSinh[i].hoChieu.noiCap,
                //       }
                //     : null,
                // ngayNhapHoc: p.hocSinh[i].ngayNhapHoc
                //     ? p.hocSinh[i].ngayNhapHoc
                //     : null,
                // lopHoc: p.maLH,
            });
        }
        return result;
    }

    async onlyGV() {
        const all = await this.findAll();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push(all[i].GVCN);
        }
        return result;
    }

    async update(id: string, dto: LopHocDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            if (dto.maLH) doc.maLH = dto.maLH;
            if (dto.GVCN) doc.GVCN = await this.ndSer.objectify(dto.GVCN);
            if (dto.hocSinh)
                doc.hocSinh = await this.ndSer.bulkObjectify(dto.hocSinh);
            await doc.save();
        });
    }

    async objectify_fromName(lop: string) {
        const one = await this.model.findOne(
            { maLH: lop },
            null,
            null,
            async (err, doc) => {
                if (err) {
                    console.log(err);
                    return null;
                } else return doc;
            },
        );
        return one ? one._id : null;
    }

    async objectify_fromID(lop: string) {
        const one = await this.model.findById(
            lop,
            null,
            null,
            async (err, doc) => {
                if (err) {
                    console.log(err);
                    return null;
                } else return doc;
            },
        );
        return one ? one._id : null;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
