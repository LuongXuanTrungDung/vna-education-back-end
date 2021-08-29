import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LienHeDocument = LienHe & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class LienHe {
    @Prop({ required: true }) hoTen: string;
    @Prop({ required: true }) emailLH: string;
    @Prop({ required: true }) soDienThoai: string;
    @Prop({ required: true }) loiNhan: string;
}

export const LienHeSchema = SchemaFactory.createForClass(LienHe);
