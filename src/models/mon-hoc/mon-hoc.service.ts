import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assign, bulkObjectID } from '../../helpers/utilities';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { MonHocDto } from './mon-hoc.dto';
import { MonHoc, MonHocDocument } from './mon-hoc.entity';

@Injectable()
export class MonHocService {
    constructor(
        @InjectModel('mon_hoc') private model: Model<MonHocDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: MonHocDto) {
        const { giaoVien, ...rest } = dto;
        return await this.model.create({
            ...rest,
            giaoVien: bulkObjectID(giaoVien),
        });
    }

    async forSelect() {
        const result = [];
        const mh = await this.findAll();
        for (let i = 0; i < mh.length; i++) {
            result.push({
                id: mh[i]._id,
                ten: mh[i].tenMH,
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

    async findOne(mon: string | MonHoc) {
        const org = await this.model.findById(mon);
        const one = await (await this.model.findById(mon))
            .populate({ path: 'giaoVien', model: 'nguoi_dung' })
            .execPopulate();
        const gv = [];

        for (let i = 0; i < one.giaoVien.length; i++) {
            gv.push({
                id: org.giaoVien[i],
                hoTen: one.giaoVien[i].hoTen,
            });
        }

        return {
            id: mon,
            tenMH: one.tenMH,
            soTiet: one.soTiet,
            moTa: one.moTa,
            giaoVien: gv,
        };
    }

    async update(id: string, dto: MonHocDto) {
        const { giaoVien, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (giaoVien)
                doc.giaoVien = await this.ndSer.bulkObjectify(giaoVien);
            await doc.save();
        });
    }

    async objectify(mon: string) {
        return (await this.model.findById(mon))._id;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
