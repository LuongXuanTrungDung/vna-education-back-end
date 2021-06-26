import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TietHoc } from '../tiet-hoc/tiet-hoc.entity';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { ChiTietDD, ChiTietDDSchema } from './chiTietDD.schema';

export type DiemDanhDocument = DiemDanh & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DiemDanh {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    giaoVien: NguoiDung;

    @Prop({
        required: true,
        type: [ChiTietDDSchema],
    })
    chiTiet: ChiTietDD[];

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'tiet_hoc',
    })
    tietHoc: TietHoc;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'lop_hoc',
    })
    lopHoc: LopHoc;

    @Prop() ghiChu: string;
}

export const DiemDanhSchema = SchemaFactory.createForClass(DiemDanh);
