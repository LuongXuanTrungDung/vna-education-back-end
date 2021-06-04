import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DanhGiaDocument = DanhGia & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DanhGia {
    @Prop({ required: true, index: true, unique: true })
    maDG: string;

    @Prop({ required: true })
    nguoiDG: string;

    @Prop({ required: true })
    doiTuongDG: string;

    @Prop({ required: true, default: false })
    trangThai: boolean;

    @Prop({ required: true, default: '' })
    gopY: string;

    @Prop()
    tieuChi: string[];

    @Prop({ default: 0, min: 0, max: 5 })
    diemTrungBinh: string[];
}

export const DanhGiaSchema = SchemaFactory.createForClass(DanhGia);
