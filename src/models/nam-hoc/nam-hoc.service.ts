import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign, bulkObjectID } from '../../helpers/utilities';
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

    async getOne(nam: string) {
        return await this.model.aggregate([{$match: {_id: Types.ObjectId(nam)}},
            {
                $lookup: {
                    from: 'tuan_hoc',
                    localField: 'tuanHoc',
                    foreignField: '_id',
                    as: 'tuanHoc',
                },
            },
            {
                $project: {
                    tenNam: 1,
                    namBatDau: 1,
                    namKetThuc: 1,
                    tuanHoc: 1,
                },
            },
        ]);
    }

    async getAll() {
        return await this.model.aggregate([
            {
                $lookup: {
                    from: 'tuan_hoc',
                    localField: 'tuanHoc',
                    foreignField: '_id',
                    as: 'tuanHoc',
                },
            },
            {
                $project: {
                    tenNam: 1,
                    namBatDau: 1,
                    namKetThuc: 1,
                    tuanHoc: 1,
                },
            },
        ]);
    }

    async getLatest() {
        const agg = await this.getAll();
        const thisYear = new Date().getFullYear();
        for (let i = 0; i < agg.length; i++) {
            if (agg[i].namBatDau <= thisYear && agg[i].namKetThuc >= thisYear) {
                agg[i].tuanHoc.sort((a, b) => {
                    return b.soTuan - a.soTuan;
                });
                return agg[i];
            }
        }
    }

    async getLatest_latestWeek() {
        const latest = await this.getLatest();
        return latest.tuanHoc[0];
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
            $push: { tuanHoc: { $each: bulkObjectID(weeks) } },
        });
    }

    async remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
