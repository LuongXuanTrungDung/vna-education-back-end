import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BangDiemDocument = BangDiem & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class BangDiem {
    @Prop({ required: true, index: true, unique: true })
    maBD: string;

    @Prop({ required: true, enum: [] })
    monHoc: string;

    @Prop({ required: true })
    giaoVien: string;

    @Prop({ required: true })
    hocSinh: string;

    @Prop({ required: true, min: 0, max: 10, default: 0 })
    kiemTra_mieng: number;

    @Prop({ required: true, min: 0, max: 10, default: 0 })
    kiemTra_15phut: number;

    @Prop({ required: true, min: 0, max: 10, default: 0 })
    kiemTra_1tiet: number;

    @Prop({ required: true, min: 0, max: 10, default: 0 })
    thi_HK1: number;

    @Prop({ required: true, min: 0, max: 10, default: 0 })
    thi_HK2: number;

    @Prop({ required: true, min: 0, max: 10, default: 0 })
    diemTrungBinh: number;
}

export const BangDiemSchema = SchemaFactory.createForClass(BangDiem);
