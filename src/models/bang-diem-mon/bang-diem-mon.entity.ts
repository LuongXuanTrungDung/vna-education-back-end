import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { TheoHK, TheoHKSchema } from './theoHK.schema';

export type BangDiemMonDocument = BangDiemMon & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class BangDiemMon {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'mon_hoc',
    })
    monHoc: MonHoc;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
        required: true,
    })
    hocSinh: NguoiDung;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
        required: true,
    })
    giaoVien: NguoiDung;

    @Prop({ type: TheoHKSchema, default: {} })
    hocKy1: TheoHK;

    @Prop({ type: TheoHKSchema, default: {} })
    hocKy2: TheoHK;

    @Prop({ min: 0, max: 10, default: 0 })
    diemTB: number;

    @Prop({ default: '' }) nhanXet: string;
}

export const BangDiemMonSchema = SchemaFactory.createForClass(BangDiemMon);
