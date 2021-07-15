import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BangDiemMon } from '../bang-diem-mon/bang-diem-mon.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { TheoHK, TheoHKSchema } from './theoHK.schema';

export type BangDiemTongDocument = BangDiemTong & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class BangDiemTong {
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
    GVCN: NguoiDung;

    @Prop({ type: TheoHKSchema, default: {} })
    hocKy1: TheoHK;

    @Prop({ type: TheoHKSchema, default: {} })
    hocKy2: TheoHK;

    @Prop({ type: TheoHKSchema, default: {} })
    caNam: TheoHK;

    @Prop({
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'bang_diem_mon',
            },
        ],
        default: [],
    })
    bangDiemMon: BangDiemMon[];

    @Prop({ default: '' }) nhanXet: string;

    @Prop({ default: '' }) xepLoai: string;
}

export const BangDiemTongSchema = SchemaFactory.createForClass(BangDiemTong);
