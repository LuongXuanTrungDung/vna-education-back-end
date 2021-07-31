import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { MauDanhGia } from '../mau-danh-gia/mau-danh-gia.entity';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { TuanHoc } from '../tuan-hoc/tuan-hoc.entity';
import { ChiTietDG, ChiTietDGSchema } from './chiTietDG.schema';

export type DanhGiaDocument = DanhGia & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DanhGia {
    @Prop({ required: true, unique: true, index: true })
    tenDG: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'lop_hoc',
    })
    lopHoc: LopHoc;

    @Prop({ type: [ChiTietDGSchema] })
    chiTiet: ChiTietDG[];

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'mon_hoc',
    })
    monHoc: MonHoc;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    giaoVien: NguoiDung;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'tuan_hoc',
    })
    tuanDG: TuanHoc;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'mau_danh_gia',
    })
    mauDG: MauDanhGia;

    @Prop({ default: false })
    choGVCN: boolean;
}

export const DanhGiaSchema = SchemaFactory.createForClass(DanhGia);
