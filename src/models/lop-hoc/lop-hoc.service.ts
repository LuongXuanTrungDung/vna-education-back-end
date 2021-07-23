import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { CreateLopHocDto } from './dto/create-lop-hoc.dto';
import { UpdateLopHocDto } from './dto/update-lop-hoc.dto';
import { LopHoc, LopHocDocument } from './lop-hoc.entity';

@Injectable()
export class LopHocService {
    constructor(
        @InjectModel('lop_hoc') private model: Model<LopHocDocument>,
        @Inject(forwardRef(() => NguoiDungService))
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: CreateLopHocDto) {
        const temp = [];
        for (let i = 0; i < dto.hocSinh.length; i++) {
            temp.push(Types.ObjectId(dto.hocSinh[i]));
        }
        return await this.model.create({
            maLH: dto.maLH,
            GVCN: Types.ObjectId(dto.GVCN),
            hocSinh: temp,
        });
    }

    async forSelect() {
        const result = [];
        const mh = await this.findAll();
        for (let i = 0; i < mh.length; i++) {
            result.push({
                id: mh[i]._id,
                ten: mh[i].maLH,
            });
        }
        return result;
    }

    async findAll() {
        const all = await this.model.find({});
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne(all[i]._id));
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

        if (classe.hocSinh.length > 0) {
            for (let i = 0; i < classe.hocSinh.length; i++) {
                hs.push(classe.hocSinh[i].hoTen);
            }
        }

        return {
            id: lop,
            maLH: classe.maLH,
            GVCN: classe.GVCN.hoTen,
            hocSinh: hs,
        };
    }

    async addHS(hs: string, lop: string) {
        return await this.model.findByIdAndUpdate(lop, {
            $push: { hocSinh: hs },
        });
    }

    async onlyHS(lop: string) {
        const result = [];
        const p = await (await this.model.findById(lop))
            .populate({ path: 'hocSinh', model: 'nguoi_dung' })
            .execPopulate();

        for (let i = 0; i < p.hocSinh.length; i++) {
            result.push({
                maND: p.hocSinh[i].maND,
                hoTen: p.hocSinh[i].hoTen,
                emailND: p.hocSinh[i].emailND,
                diaChi: p.hocSinh[i].diaChi,
                ngaySinh: p.hocSinh[i].ngaySinh,
                noiSinh: p.hocSinh[i].noiSinh,
                gioiTinh: p.hocSinh[i].gioiTinh,
                soDienThoai: p.hocSinh[i].soDienThoai
                    ? p.hocSinh[i].soDienThoai
                    : null,
                dangHoatDong: p.hocSinh[i].dangHoatDong,
                quocTich: p.hocSinh[i].quocTich,
                danToc: p.hocSinh[i].danToc,
                cccd: p.hocSinh[i].cccd
                    ? {
                          maSo: p.hocSinh[i].cccd.maSo,
                          ngayCap: p.hocSinh[i].cccd.ngayCap,
                          noiCap: p.hocSinh[i].cccd.noiCap,
                      }
                    : null,
                hoChieu: p.hocSinh[i].hoChieu
                    ? {
                          maSo: p.hocSinh[i].hoChieu.maSo,
                          ngayCap: p.hocSinh[i].hoChieu.ngayCap,
                          noiCap: p.hocSinh[i].hoChieu.noiCap,
                      }
                    : null,
                ngayNhapHoc: p.hocSinh[i].ngayNhapHoc
                    ? p.hocSinh[i].ngayNhapHoc
                    : null,
                lopHoc: p.maLH,
            });
        }
        return result;
    }

    async update(id: string, dto: UpdateLopHocDto) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    maLH: dto.maLH,
                    GVCN: await this.ndSer.objectify(dto.GVCN),
                    hocSinh: await this.ndSer.bulkObjectify(dto.hocSinh),
                },
            },
            { new: true },
        );
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
        return await this.model.findOneAndDelete({ maLH: id });
    }
}
