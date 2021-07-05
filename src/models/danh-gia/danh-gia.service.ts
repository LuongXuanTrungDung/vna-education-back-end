import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
        private readonly mdgSer: MauDanhGiaService,
        private readonly lhSer: LopHocService,
        private readonly mhSer: MonHocService,
    ) {}

    async create(dto: CreateDanhGiaDto) {
        const { mauDG, monHoc, lopHoc, giaoVien, ...rest } = dto;
        return await this.model.create({
            ...rest,
            mauDG: Types.ObjectId(dto.mauDG),
            monHoc: Types.ObjectId(dto.monHoc),
            giaoVien: Types.ObjectId(dto.giaoVien),
            lopHoc: Types.ObjectId(dto.lopHoc),
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
        return {
            id: rev._id,
            tenDG: rev.tenDG,
            ngayDG: rev.ngayDG,
            tieuChi: rev.mauDG.tieuChi,
            monHoc: rev.monHoc.tenMH,
            giaoVien: rev.giaoVien.hoTen,
            choGVCN: rev.choGVCN,
            chiTiet: {
                lopHoc: rev.lopHoc.maLH,
                siSo: rev.lopHoc.hocSinh.length,
                diemForm: rev.chiTiet,
            },
        };
    }

    async update(id: string, dto: UpdateDanhGiaDto) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    tenDG: dto.tenDG,
                    choGVCN: dto.choGVCN,
                    chiTiet: dto.chiTiet,
                    ngayDG: dto.ngayDG,
                    monHoc: (await this.mhSer.findOne(dto.monHoc))._id,
                    mauDG: (await this.mdgSer.findOne(dto.mauDG))._id,
                    lopHoc: (await this.lhSer.findOne(dto.lopHoc))._id,
                    giaoVien: (await this.ndSer.getOne(dto.giaoVien))._id,
                },
            },
            { new: true },
        );
    }

    async update_fromHS(id: string, dto: HSDGDto) {
        return await this.model.findByIdAndUpdate(id, {
            $push: { chiTiet: dto },
        });
    }

    async getOne(id: string) {
        return await this.model.findById(id);
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
