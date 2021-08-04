import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assign, bulkObjectID } from '../../helpers/utilities';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { MonHocDto } from './mon-hoc.dto';
import { MonHocDocument } from './mon-hoc.entity';

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

    async findAll() {
        const all = await this.model
            .find()
            .populate({ path: 'giaoVien', select: 'hoTen' })
            .exec();

        const result = [];
        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                tenMH: all[i].tenMH,
                soTiet: all[i].soTiet,
                moTa: all[i].moTa,
                giaoVien: all[i].giaoVien.map((val, ind) => {
                    return {
                        _id: all[i].populated('giaoVien')[ind],
                        hoTen: val.hoTen,
                    };
                }),
            });
        }
        return result;
    }

    async findOne(mon: string) {
        const one = await (await this.model.findById(mon))
            .populate({ path: 'giaoVien', select: 'hoTen' })
            .execPopulate();

        return {
            _id: mon,
            tenMH: one.tenMH,
            soTiet: one.soTiet,
            moTa: one.moTa,
            giaoVien: one.giaoVien.map((val, ind) => {
                return {
                    _id: one.populated('giaoVien')[ind],
                    hoTen: val.hoTen,
                };
            }),
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
