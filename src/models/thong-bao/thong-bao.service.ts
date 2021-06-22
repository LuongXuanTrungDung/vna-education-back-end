import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateThongBaoDto } from './dto/create-thong-bao.dto';
import { UpdateThongBaoDto } from './dto/update-thong-bao.dto';
import { ThongBaoDocument } from './thong-bao.entity';

@Injectable()
export class ThongBaoService {
    constructor(
        @InjectModel('thong_bao') private model: Model<ThongBaoDocument>,
    ) {}

    async create(dto: CreateThongBaoDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        const news = await this.model
            .find({}, null, { sort: { date: 1 } })
            .populate([
                {
                    path: 'nguoiDang',
                    model: 'nguoi_dung',
                },
                {
                    path: 'ngayDang',
                    model: 'ngay_hoc',
                },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < news.length; i++) {
            const temp = {
                id: news[i]._id,
                danhMuc: news[i].danhMuc,
                tieuDe: news[i].tieuDe,
                tomTat: news[i].tomTat,
                nguoiDang: news[i].nguoiDang.hoTen,
                ngayDang: news[i].ngayDang.maNgay,
            };
            result.push(temp);
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
                {
                    path: 'ngayDang',
                    model: 'ngay_hoc',
                },
            ])
            .execPopulate();
        return {
            id: ns._id,
            danhMuc: ns.danhMuc,
            tieuDe: ns.tieuDe,
            tomTat: ns.tomTat,
            nguoiDang: ns.nguoiDang.hoTen,
            ngayDang: ns.ngayDang.maNgay,
            noiDung: ns.noiDung,
        };
    }

    async update(id: string, dto: UpdateThongBaoDto) {
        return await this.model.findByIdAndUpdate(id, dto);
    }

    async remove(id: string) {
        return await this.model.findById(id);
    }
}