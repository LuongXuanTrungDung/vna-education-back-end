import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LopHocDocument = LopHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class LopHoc {
    @Prop({ required: true, index: true, unique: true })
    maLH: string;

    @Prop({ required: true })
    giaoVien: string;

    @Prop({ required: true })
    hocSinh: string[];
}

export const LopHocSchema = SchemaFactory.createForClass(LopHoc);
