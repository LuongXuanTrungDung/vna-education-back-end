import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bulkObjectID } from '../../helpers/utilities';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { CreateNamHocDto } from './dto/create-nam-hoc.dto';
import { UpdateNamHocDto } from './dto/update-nam-hoc.dto';
import { NamHocDocument } from './nam-hoc.entity';

@Injectable()
export class NamHocService {
    constructor(
        @InjectModel('nam_hoc') private model: Model<NamHocDocument>,
        private readonly tuanSer: TuanHocService,
    ) {}

    async create(dto: CreateNamHocDto) {
        const { tuanHoc, ...rest } = dto;
        const t = bulkObjectID(tuanHoc);
        return await this.model.create({
            ...rest,
            tuanHoc: t,
        });
    }

    async findAll() {
        return await this.model.find();
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

        for (let i = 0; i < one.tuanHoc.length; i++) {
            tuan.push(one.tuanHoc[i]);
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
                tenTuan: one.tuanHoc[i].tenTuan,
                soTuan: one.tuanHoc[i].soTuan,
                ngayBatDau: one.tuanHoc[i].ngayBatDau,
                ngayKetThuc: one.tuanHoc[i].ngayKetThuc,
                hocKy: one.tuanHoc[i].hocKy,
            });
        }

        return tuan.sort((a, b) => b.soTuan - a.soTuan);
    }

    async update(id: string, dto: UpdateNamHocDto) {
        await this.model.findById(id).then(async (doc) => {
            const { tuanHoc, ...rest } = dto;

            for (const key in rest) {
                if (Object.prototype.hasOwnProperty.call(rest, key)) {
                    doc[key] = rest[key];
                }
            }

            if (tuanHoc)
                doc.tuanHoc = await this.tuanSer.bulkObjectify(tuanHoc);
            await doc.save();
        });
        return this.findOne(id);
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
