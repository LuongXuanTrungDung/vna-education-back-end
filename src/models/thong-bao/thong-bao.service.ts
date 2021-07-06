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
            nguoiDang: Types.ObjectId(dto.nguoiDang),
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
            const temp = {
                id: news[i]._id,
                danhMuc: news[i].danhMuc,
                tieuDe: news[i].tieuDe,
                tomTat: news[i].tomTat,
                nguoiDang: news[i].nguoiDang.hoTen,
				noiDung: news[i].noiDung,
                ngayDang: news[i].ngayDang,
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
        };
    }

    async update(id: string, dto: UpdateThongBaoDto) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    tieuDe: dto.tieuDe,
                    noiDung: dto.noiDung,
                    ngayDang: dto.ngayDang,
                    danhMuc: dto.danhMuc,
                    tomTat: dto.tomTat,
                    daDuyet: dto.daDuyet,
                    nguoiDang: (await this.ndSer.getOne(dto.nguoiDang))._id,
                },
            },
            { new: true },
        );
    }

    async remove(id: string) {
        return await this.model.findById(id);
    }
}
