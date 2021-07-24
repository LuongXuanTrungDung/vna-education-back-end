import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { assign } from '../../helpers/utilities';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { ThongBaoDto } from './thong-bao.dto';
import { ThongBaoDocument } from './thong-bao.entity';

@Injectable()
export class ThongBaoService {
    constructor(
        @InjectModel('thong_bao') private model: Model<ThongBaoDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: ThongBaoDto) {
        const { nguoiDang, ...rest } = dto;
        return await this.model.create({
            ...rest,
            nguoiDang: Types.ObjectId(nguoiDang),
        });
    }

    async findAll() {
        const news = await this.model
            .find({}, null, { sort: { date: 1 } })
            .populate([
                {
                    path: 'nguoiDang',
                    model: 'nguoi_dung',
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < news.length; i++) {
            result.push(await this.findOne(news[i]._id));
        }
        return result;
    }

    async findAll_byCatalog(catalog: string) {
        const all = await this.findAll();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            if (all[i].danhMuc == catalog) result.push(all[i]);
        }
        return result;
    }

    async findOne(tb: string) {
        const ns = await (
            await this.model.findById(tb)
        )
            .populate([
                {
                    path: 'nguoiDang',
                    model: 'nguoi_dung',
                },
            ])
            .execPopulate();
        return {
            id: tb,
            danhMuc: ns.danhMuc,
            tieuDe: ns.tieuDe,
            tomTat: ns.tomTat,
            nguoiDang: ns.nguoiDang.hoTen,
            ngayDang: ns.ngayDang,
            noiDung: ns.noiDung,
            daDuyet: ns.daDuyet,
        };
    }

    async update(id: string, dto: ThongBaoDto) {
        const { nguoiDang, ...rest } = dto;
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(rest, doc);
            if (nguoiDang)
                doc.nguoiDang = await this.ndSer.objectify(nguoiDang);
            await doc.save();
        });
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
