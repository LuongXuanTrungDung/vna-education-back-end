import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NgayHocDocument = NgayHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class NgayHoc {
    @Prop({ required: true, index: true, unique: true })
    maNgay: string;

    @Prop({ required: true })
    tuanHoc: string;

    @Prop({ required: true })
    ngayCuThe: Date;
}

export const NgayHocSchema = SchemaFactory.createForClass(NgayHoc);
