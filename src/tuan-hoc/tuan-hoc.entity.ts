import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TuanHocDocument = TuanHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TuanHoc {
    @Prop({ required: true, index: true, unique: true })
    maTuan: string;

    @Prop({ required: true })
    hocKy: string;

    @Prop({ required: true })
    ngayBatDau: Date;

    @Prop({ required: true })
    ngayKetThuc: Date;
}

export const TuanHocSchema = SchemaFactory.createForClass(TuanHoc);
