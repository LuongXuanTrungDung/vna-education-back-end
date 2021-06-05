import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TietHocDocument = TietHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TietHoc {
    @Prop({ required: true, index: true, unique: true })
    maTH: string;

    @Prop({ required: true })
    lopHoc: string;

    @Prop({ required: true })
    giaoVien: string;

    @Prop({ required: true })
    ngayHoc: string;

    @Prop({ required: true, enum: ['Toán học', 'Ngữ văn', 'Anh văn'] })
    monHoc: string;

    @Prop({ required: true, enum: ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4'] })
    tietHoc_cuThe: Date;
}

export const TietHocSchema = SchemaFactory.createForClass(TietHoc);
