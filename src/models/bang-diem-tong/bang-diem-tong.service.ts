import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { bulkObjectID } from '../../helpers/utilities';
import { BangDiemMonService } from '../bang-diem-mon/bang-diem-mon.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { BangDiemTongDocument } from './bang-diem-tong.entity';
import { CreateBangDiemTongDto } from './dto/create-bang-diem-tong.dto';
import { UpdateBangDiemTongDto } from './dto/update-bang-diem-tong.dto';

@Injectable()
export class BangDiemTongService {
    constructor(
        @InjectModel('bang_diem_tong')
        private model: Model<BangDiemTongDocument>,
        private readonly ndSer: NguoiDungService,
        private readonly bdMSer: BangDiemMonService,
    ) {}

    async create(dto: CreateBangDiemTongDto) {
        return await this.model.create({
            nhanXet: dto.nhanXet,
            xepLoai: dto.xepLoai,
            hocKy1: {
                hanhKiem: dto.hanhKiem_hk1,
                hocLuc: dto.hocLuc_hk1,
                diemTB: dto.diemTB_hk1,
            },
            hocKy2: {
                hocLuc: dto.hocLuc_hk2,
                hanhKiem: dto.hanhKiem_hk2,
                diemTB: dto.diemTB_hk2,
            },
            caNam: {
                hocLuc: dto.hocLuc_caNam,
                hanhKiem: dto.hanhKiem_caNam,
                diemTB: dto.diemTB_caNam,
            },
            hocSinh: Types.ObjectId(dto.hocSinh),
            GVCN: Types.ObjectId(dto.GVCN),
            bangDiemMon: bulkObjectID(dto.bangDiemMon),
        });
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne_byHS(hs: string) {
        const m = await this.bdMSer.findAll_byHS(hs);
        const t1 = await this.model.findOne({
            hocSinh: await this.ndSer.objectify(hs),
        });
        const t2 = await this.findOne(t1._id);
        return { ...t2, bangDiemMon: m };
    }

    async findOne(id: string) {
        const bd = await (
            await this.model.findById(id)
        )
            .populate([
                {
                    path: 'hocSinh',
                    model: 'nguoi_dung',
                    populate: {
                        path: 'lopHoc',
                        model: 'lop_hoc',
                    },
                },
                { path: 'GVCN', model: 'nguoi_dung' },
            ])
            .execPopulate();

        return {
            hocSinh: bd.hocSinh.hoTen,
            lopHoc: bd.hocSinh.lopHoc.maLH,
            GVCN: bd.GVCN.hoTen,
            hocKy1: bd.hocKy1,
            hocKy2: bd.hocKy2,
            caNam: bd.caNam,
            xepLoai: bd.xepLoai,
            nhanXet: bd.nhanXet,
        };
    }

    async getOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: UpdateBangDiemTongDto) {
        await this.getOne(id).then(async (doc) => {
            if (dto.nhanXet) doc.nhanXet = dto.nhanXet;
            if (dto.xepLoai) doc.xepLoai = dto.xepLoai;

            if (dto.hanhKiem_hk1) doc.hocKy1.hanhKiem = dto.hanhKiem_hk1;
            if (dto.hocLuc_hk1) doc.hocKy1.hocLuc = dto.hocLuc_hk1;
            if (dto.diemTB_hk1) doc.hocKy1.diemTB = dto.diemTB_hk1;

            if (dto.hanhKiem_hk2) doc.hocKy2.hanhKiem = dto.hanhKiem_hk2;
            if (dto.hocLuc_hk2) doc.hocKy2.hocLuc = dto.hocLuc_hk2;
            if (dto.diemTB_hk2) doc.hocKy2.diemTB = dto.diemTB_hk2;

            if (dto.hanhKiem_caNam) doc.caNam.hanhKiem = dto.hanhKiem_caNam;
            if (dto.hocLuc_caNam) doc.caNam.hocLuc = dto.hocLuc_caNam;
            if (dto.diemTB_caNam) doc.caNam.diemTB = dto.diemTB_caNam;

            if (dto.hocSinh)
                doc.hocSinh = await this.ndSer.objectify(dto.hocSinh);
            if (dto.GVCN) doc.GVCN = await this.ndSer.objectify(dto.GVCN);
            if (dto.bangDiemMon)
                doc.bangDiemMon = await this.bdMSer.bulkObjectify(
                    dto.bangDiemMon,
                );

            await doc.save();
        });
        return await this.findOne(id);
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
