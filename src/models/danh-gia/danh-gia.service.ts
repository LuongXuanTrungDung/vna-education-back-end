import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign, bulkObjectID, objectify } from '../../helpers/utilities';
import { LopHocService } from '../lop-hoc/lop-hoc.service';
import { MauDanhGiaService } from '../mau-danh-gia/mau-danh-gia.service';
import { MonHocService } from '../mon-hoc/mon-hoc.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
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
        private readonly tuanSer: TuanHocService,
    ) {}

    async create(dto: CreateDanhGiaDto) {
        return await this.model.create({
            tenDG: dto.tenDG,
            choGVCN: dto.choGVCN,
            tuanDG: Types.ObjectId(dto.tuanDG),
            mauDG: Types.ObjectId(dto.mauDG),
            monHoc: Types.ObjectId(dto.monHoc),
            giaoVien: bulkObjectID(dto.giaoVien),
            lopHoc: Types.ObjectId(dto.lopHoc),
        });
    }

    async findAll_byUser(hs: string, tuan: string) {
        const result = [];
        const user = await this.ndSer.findOne_byID(hs);
        const week = await this.tuanSer.findOne(tuan);
        const revs = await this.model
            .find({ lopHoc: Object(user.hocTap.idLop), tuanDG: Object(tuan) })
            .populate([
                {
                    path: 'giaoVien',
                    model: 'nguoi_dung',
                    select: 'hoTen',
                },
                { path: 'monHoc', model: 'mon_hoc', select: 'tenMH' },
                {
                    path: 'mauDG',
                    model: 'mau_danh_gia',
                    select: 'tieuChi',
                },
                {
                    path: 'lopHoc',
                    model: 'lop_hoc',
                    select: 'maLH',
                },
            ])
            .exec();

        for (let i = 0; i < revs.length; i++) {
            result.push({
                id: revs[i]._id,
                tenDG: revs[i].tenDG,
                tieuChi: revs[i].mauDG.tieuChi,
                choGVCN: revs[i].choGVCN,
                tuanDG: week.soTuan,
                tenLop: revs[i].lopHoc.maLH,
                monHoc: revs[i].monHoc.tenMH,
                hetHan: false,
                hocSinhDG: {
                    diemDG: 0,
                    gopY: '',
                    nguoiDG: hs,
                    trangThai: false,
                    formDG: [],
                },
            });
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

    async findOne(id: string) {
        const gvs = [];
        const rev = await (
            await this.model.findById(id)
        )
            .populate([
                {
                    path: 'giaoVien',
                    model: 'nguoi_dung',
                    select: 'hoTen',
                },
                { path: 'monHoc', model: 'mon_hoc', select: 'tenMH' },
                {
                    path: 'mauDG',
                    model: 'mau_danh_gia',
                    select: 'tieuChi',
                },
                {
                    path: 'lopHoc',
                    model: 'lop_hoc',
                    select: ['maLH', 'hocSinh'],
                },
                {
                    path: 'tuanHoc',
                    model: 'tuan_hoc',
                    select: 'soTuan',
                },
            ])
            .execPopulate();

        for (let i = 0; i < rev.giaoVien.length; i++) {
            gvs.push(rev.giaoVien[i].hoTen);
        }

        return {
            id: rev._id,
            tenDG: rev.tenDG,
            tieuChi: rev.mauDG.tieuChi,
            monHoc: rev.monHoc.tenMH,
            giaoVien: gvs,
            choGVCN: rev.choGVCN,
            mauDG: rev.mauDG.tenMau,
            lopHoc: rev.lopHoc.maLH,
            tuanDG: rev.tuanDG.soTuan,
            chiTiet: {
                lopHoc: rev.lopHoc.maLH,
                siSo: rev.lopHoc.hocSinh.length,
                diemForm: rev.chiTiet,
            },
        };
    }

    async update(id: string, dto: UpdateDanhGiaDto) {
        const { monHoc, mauDG, lopHoc, giaoVien, tuanDG, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            objectify({ monHoc, mauDG, lopHoc, giaoVien, tuanDG }, doc);
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
