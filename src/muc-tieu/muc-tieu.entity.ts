import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MucTieuDocument = MucTieu & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class MucTieu {
    @Prop({ required: true, index: true, unique: true })
    maMT: string;

    @Prop({ required: true })
    noiDung: string;

    @Prop({ required: true, min: 0, max: 5, default: 0 })
    diemDG: number;

    @Prop({ required: true, default: 1, min: 1 })
    trongSo: number;
}

export const MucTieuSchema = SchemaFactory.createForClass(MucTieu);
