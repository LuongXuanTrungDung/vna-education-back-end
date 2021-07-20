import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bulkObjectID } from '../../helpers/utilities';
import { CreateTuanHocDto } from './dto/create-tuan-hoc.dto';
import { UpdateTuanHocDto } from './dto/update-tuan-hoc.dto';
import { TuanHocDocument } from './tuan-hoc.entity';

@Injectable()
export class TuanHocService {
    constructor(
        @InjectModel('tuan_hoc') private model: Model<TuanHocDocument>,
    ) {}

    async create(dto: CreateTuanHocDto) {
        const { buoiHoc, ...rest } = dto;
        return await this.model.create({
            ...rest,
            buoiHoc: bulkObjectID(buoiHoc),
        });
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        const tuan = await (
            await this.model.findById(id)
        )
            .populate({
                path: 'buoiHoc',
                model: 'buoi_hoc',
                populate: {
                    path: 'tietHoc',
                    model: 'tiet_hoc',
                    populate: [
                        { path: 'monHoc', model: 'mon_hoc' },
                        { path: 'giaoVien', model: 'nguoi_dung' },
                        { path: 'lopHoc', model: 'lop_hoc' },
                    ],
                },
            })
            .execPopulate();
        const t2 = await (
            await this.model.findById(id)
        )
            .populate({
                path: 'buoiHoc',
                model: 'buoi_hoc',
            })
            .execPopulate();
        const t1 = await this.model.findById(id);

        const b = [];

        for (let i = 0; i < tuan.buoiHoc.length; i++) {
            const t = [];
            for (let j = 0; j < tuan.buoiHoc[i].tietHoc.length; j++) {
                t.push({
                    id: t2.buoiHoc[i].tietHoc[j],
                    monHoc: tuan.buoiHoc[i].tietHoc[j].monHoc.tenMH,
                    lopHoc: tuan.buoiHoc[i].tietHoc[j].lopHoc.maLH,
                    giaoVien: tuan.buoiHoc[i].tietHoc[j].giaoVien.hoTen,
                    ghiChu: tuan.buoiHoc[i].tietHoc[j].ghiChu,
                });
            }

            b.push({
                id: t1.buoiHoc[i],
                thu: tuan.buoiHoc[i].thu,
                ngayHoc: tuan.buoiHoc[i].ngayHoc,
                tietHoc: t,
            });
        }

        return {
            id: tuan._id,
            soTuan: tuan.soTuan,
            tenTuan: tuan.tenTuan,
            ngayBatDau: tuan.ngayBatDau,
            ngayKetThuc: tuan.ngayKetThuc,
            hocKy: tuan.hocKy,
            buoiHoc: b,
        };
    }

    async update(id: string, dto: UpdateTuanHocDto) {
        const { buoiHoc, ...rest } = dto;
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...rest,
                },
                $push: { buoiHoc: { $each: buoiHoc } },
            },
            { new: true },
        );
    }

    async objectify(tuan: string) {
        return (await this.model.findById(tuan))._id;
    }

    async bulkObjectify(tuan: string[]) {
        const result = [];
        for (let i = 0; i < tuan.length; i++) {
            result.push(await this.objectify(tuan[i]));
        }
        return result;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
