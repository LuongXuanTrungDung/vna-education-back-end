import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { CreateThongBaoDto } from './dto/create-thong-bao.dto';
import { UpdateThongBaoDto } from './dto/update-thong-bao.dto';
import { ThongBaoDocument } from './thong-bao.entity';

@Injectable()
export class ThongBaoService {
    constructor(
        @InjectModel('thong_bao') private model: Model<ThongBaoDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: CreateThongBaoDto) {
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
            result.push({
                id: news[i]._id,
                danhMuc: news[i].danhMuc,
                tieuDe: news[i].tieuDe,
                tomTat: news[i].tomTat,
                nguoiDang: news[i].nguoiDang.hoTen,
                noiDung: news[i].noiDung,
                ngayDang: news[i].ngayDang,
                daDuyet: news[i].daDuyet,
            });
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

    async findOne(id: string) {
        const ns = await (
            await this.model.findById(id)
        )
            .populate([
                {
                    path: 'nguoiDang',
                    model: 'nguoi_dung',
                },
            ])
            .execPopulate();
        return {
            id: ns._id,
            danhMuc: ns.danhMuc,
            tieuDe: ns.tieuDe,
            tomTat: ns.tomTat,
            nguoiDang: ns.nguoiDang.hoTen,
            ngayDang: ns.ngayDang,
            noiDung: ns.noiDung,
            daDuyet: ns.daDuyet,
        };
    }

    async getOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: UpdateThongBaoDto) {
        await this.getOne(id).then(async (doc) => {
            if (dto.nguoiDang)
                doc.nguoiDang = (await this.ndSer.getOne(dto.nguoiDang))._id;
            if (dto.tomTat) doc.tomTat = dto.tomTat;
            if (dto.tieuDe) doc.tieuDe = dto.tieuDe;
            if (dto.daDuyet) doc.daDuyet = dto.daDuyet;
            if (dto.danhMuc) doc.danhMuc = dto.danhMuc;
            if (dto.ngayDang) doc.ngayDang = dto.ngayDang;
            if (dto.noiDung) doc.noiDung = dto.noiDung;
            await doc.save();
        });
        // return await this.findOne(id)
        return 'Cập nhật thành công';
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
