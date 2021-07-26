import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assign } from '../../helpers/utilities';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { CreateNamHocDto } from './dto/create-nam-hoc.dto';
import { UpdateNamHocDTO } from './dto/update-nam-hoc.dto';
import { NamHocDocument } from './nam-hoc.entity';

@Injectable()
export class NamHocService {
    constructor(
        @InjectModel('nam_hoc') private model: Model<NamHocDocument>,
        private readonly tuanSer: TuanHocService,
    ) {}

    async create(dto: CreateNamHocDto) {
        return await this.model.create({
            ...dto,
            tuanHoc: [],
        });
    }

    async findAll() {
        const all = await this.model.find();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            const { tuanHoc, ...rest } = await this.findOne(all[i]._id);
            const w = await this.onlyWeeks(all[i]._id);
            result.push({
                ...rest,
                tuanHoc: w,
            });
        }
        return result;
    }

    async findOne(nam: string) {
        const one = await (
            await this.model.findById(nam)
        )
            .populate({
                path: 'tuanHoc',
                model: 'tuan_hoc',
            })
            .execPopulate();
        const tuan = [];

        if (one.tuanHoc) {
            for (let i = 0; i < one.tuanHoc.length; i++) {
                tuan.push(one.tuanHoc[i]);
            }
        }

        return await {
            id: nam,
            tenNam: one.tenNam,
            namBatDau: one.namBatDau,
            namKetThuc: one.namKetThuc,
            tuanHoc: tuan,
        };
    }

    async onlyWeeks(nam: string) {
        const org = await this.model.findById(nam);
        const one = await (
            await this.model.findById(nam)
        )
            .populate({
                path: 'tuanHoc',
                model: 'tuan_hoc',
            })
            .execPopulate();
        const tuan = [];

        for (let i = 0; i < one.tuanHoc.length; i++) {
            tuan.push({
                id: org.tuanHoc[i],
                tenTuan: one.tuanHoc[i].tenTuan,
                soTuan: one.tuanHoc[i].soTuan,
                ngayBatDau: one.tuanHoc[i].ngayBatDau,
                ngayKetThuc: one.tuanHoc[i].ngayKetThuc,
                hocKy: one.tuanHoc[i].hocKy,
            });
        }

        return tuan.sort((a, b) => b.soTuan - a.soTuan);
    }

    async findLatest() {
        const all = await this.findAll();
        return all[all.length - 1];
    }

    async update(id: string, dto: UpdateNamHocDTO) {
        const { tuanHoc, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (tuanHoc)
                doc.tuanHoc = await this.tuanSer.bulkObjectify(tuanHoc);
            await doc.save();
        });
    }

    async addWeeks(id: string, weeks: string[]) {
        return await this.model.findByIdAndUpdate(id, {
            $push: { tuanHoc: { $each: weeks } },
        });
    }

    async remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
