import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiemDanhDocument = DiemDanh & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DiemDanh {
    @Prop({ required: true, index: true, unique: true })
    maDD: string;

    @Prop({ required: true })
    giaoVien: string;

    @Prop({ required: true })
    hocSinh: string;

    @Prop({ required: true })
    tietHoc: string;

    @Prop({ required: true })
    lopHoc: string;

    @Prop({ required: true, default: true })
    coMat: boolean;
}

export const DiemDanhSchema = SchemaFactory.createForClass(DiemDanh);
