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
                    select: 'hoTen',
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < news.length; i++) {
            result.push({
                _id: news[i]._id,
                danhMuc: news[i].danhMuc,
                tieuDe: news[i].tieuDe,
                tomTat: news[i].tomTat,
                nguoiDang: news[i].nguoiDang
                    ? {
                          _id: news[i].populated('nguoiDang'),
                          hoTen: news[i].nguoiDang.hoTen,
                      }
                    : null,
                ngayDang: news[i].ngayDang,
                noiDung: news[i].noiDung,
                daDuyet: news[i].daDuyet,
            });
        }
        return result;
    }

    async getAll(condition: any = {}) {
        const all = await this.model
            .find(condition)
            .populate([
                {
                    path: 'nguoiDang',
                    select: 'hoTen',
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                danhMuc: all[i].danhMuc,
                tieuDe: all[i].tieuDe,
                tomTat: all[i].tomTat,
                nguoiDang: all[i].nguoiDang?.hoTen,
                ngayDang: all[i].ngayDang,
                noiDung: all[i].noiDung,
                daDuyet: all[i].daDuyet,
            });
        }
        return result;
    }

    async getAll_byCatalog(catalog: string) {
        return await this.getAll({ danhMuc: catalog });
    }

    async findOne(tb: string) {
        const ns = await (
            await this.model.findById(tb)
        )
            .populate([
                {
                    path: 'nguoiDang',
                    select: 'hoTen',
                },
            ])
            .execPopulate();
        return {
            _id: tb,
            danhMuc: ns.danhMuc,
            tieuDe: ns.tieuDe,
            tomTat: ns.tomTat,
            nguoiDang: ns.nguoiDang
                ? {
                      _id: ns.populated('nguoiDang'),
                      hoTen: ns.nguoiDang.hoTen,
                  }
                : null,
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
