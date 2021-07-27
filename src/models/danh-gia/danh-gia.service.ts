import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign, bulkObjectID } from '../../helpers/utilities';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from '../mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { DanhGiaDocument } from './danh-gia.entity';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { HSDGDto } from './dto/HSDG.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Injectable()
export class DanhGiaService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
        private readonly ndSer: NguoiDungService,
        @Inject(forwardRef(() => MauDanhGiaService))
        private readonly mdgSer: MauDanhGiaService,
        private readonly lhSer: LopHocService,
        private readonly mhSer: MonHocService,
    ) {}

    async create(dto: CreateDanhGiaDto) {
        const { mauDG, monHoc, lopHoc, giaoVien, ...rest } = dto;

        return await this.model.create({
            ...rest,
            mauDG: Types.ObjectId(mauDG),
            monHoc: Types.ObjectId(monHoc),
            giaoVien: bulkObjectID(giaoVien),
            lopHoc: Types.ObjectId(lopHoc),
        });
    }

    async findAll_byUser(classe: string) {
        const result = [];
        const revs = await this.findAll();
        for (let i = 0; i < revs.length; i++) {
            if (revs[i].chiTiet.lopHoc == classe) {
                result.push(revs[i]);
            }
        }
        return result;
    }

    async findAll() {
        const result = [];
        const all = await this.model.find({});
        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne(all[i]._id));
        }
        return result;
    }

    async findAll_byDate(date: string) {
        const result = [];
        const all = await this.model.find({ ngayDG: date });
        for (let i = 0; i < all.length; i++) {
            result.push(await this.findOne(all[i]._id));
        }
        return result;
    }

    async findOne(id: string) {
        const gvs = [];
        const org = await this.model.findById(id);
        const rev = await (
            await this.model.findById(id)
        )
            .populate([
                {
                    path: 'giaoVien',
                    model: 'nguoi_dung',
                },
                { path: 'monHoc', model: 'mon_hoc' },
                {
                    path: 'mauDG',
                    model: 'mau_danh_gia',
                },
                {
                    path: 'lopHoc',
                    model: 'lop_hoc',
                },
            ])
            .execPopulate();

        for (let i = 0; i < rev.giaoVien.length; i++) {
            gvs.push({
                id: org.giaoVien[i],
                hoTen: rev.giaoVien[i].hoTen,
            });
        }

        return {
            id: rev._id,
            tenDG: rev.tenDG,
            ngayDG: rev.ngayDG,
            tieuChi: rev.mauDG.tieuChi,
            monHoc: {
                id: org.monHoc,
                tenMH: rev.monHoc.tenMH,
            },
            giaoVien: gvs,
            choGVCN: rev.choGVCN,
            mauDG: {
                id: org.mauDG,
                tenMau: rev.mauDG.tenMau,
            },
            lopHoc: {
                id: org.lopHoc,
                maLH: rev.lopHoc.maLH,
            },
            chiTiet: {
                lopHoc: rev.lopHoc.maLH,
                siSo: rev.lopHoc.hocSinh.length,
                diemForm: rev.chiTiet,
            },
        };
    }

    async update(id: string, dto: UpdateDanhGiaDto) {
        const { monHoc, mauDG, lopHoc, giaoVien, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;

            assign(rest, doc);
            if (monHoc) doc.monHoc = await this.mhSer.objectify(monHoc);
            if (mauDG) doc.mauDG = await this.mdgSer.objectify(mauDG);
            if (lopHoc) doc.lopHoc = await this.lhSer.objectify_fromID(lopHoc);
            if (giaoVien)
                doc.giaoVien = await this.ndSer.bulkObjectify(giaoVien);

            await doc.save();
        });
    }

    async update_fromHS(id: string, dto: HSDGDto) {
        return await this.model.findByIdAndUpdate(id, {
            $push: { chiTiet: dto },
        });
    }

    async getAll() {
        const revs = await this.model.find();
        const result = [];

        for (let i = 0; i < revs.length; i++) {
            const one = await this.findOne(revs[i]._id);
            const { chiTiet, tieuChi, ...rest } = one;
            result.push(rest);
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
