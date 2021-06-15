import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { TheoHK, TheoHKSchema } from './theoHK.schema';

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
    giaoVien: NguoiDung;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
        required: true,
    })
    hocSinh: NguoiDung;

    @Prop({ type: TheoHKSchema })
    hocKy1: TheoHK;

    @Prop({ type: TheoHKSchema })
    hocKy2: TheoHK;

    @Prop({ min: 0, max: 10, default: 0 })
    diemTB_caNam: number;

    @Prop() nhanXet: string;

    @Prop({ enum: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém'] })
    xepLoai: string;
}

export const BangDiemSchema = SchemaFactory.createForClass(BangDiem);
