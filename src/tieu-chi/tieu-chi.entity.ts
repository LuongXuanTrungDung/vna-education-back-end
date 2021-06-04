import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TieuChiDocument = TieuChi & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TieuChi {
    @Prop({ required: true, index: true, unique: true })
    maTC: string;

    @Prop({ required: true })
    tenTC: string;

    @Prop({ required: true })
    chiTiet: string;

    @Prop({ required: true, default: 1, min: 1 })
    trongSo: number;

    @Prop({ required: true })
    mucTieu: string[];

    @Prop({ required: true, default: 0, min: 0, max: 5 })
    diemTrungBinh: string[];
}

export const TieuChiSchema = SchemaFactory.createForClass(TieuChi);
