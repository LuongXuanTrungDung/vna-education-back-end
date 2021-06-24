import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TieuChi, TieuChiSchema } from './tieuChi.schema';

export type MauDanhGiaDocument = MauDanhGia & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class MauDanhGia {
    @Prop({ required: true, unique: true, index: true })
    tenMau: string;

    @Prop() ghiChu: string;

    @Prop({
        required: true,
        type: [TieuChiSchema],
    })
    tieuChi: TieuChi[];
}

export const MauDanhGiaSchema = SchemaFactory.createForClass(MauDanhGia);
