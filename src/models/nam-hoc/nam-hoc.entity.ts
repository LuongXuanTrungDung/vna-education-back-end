import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TuanHoc } from '../tuan-hoc/tuan-hoc.entity';

export type NamHocDocument = NamHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class NamHoc {
    @Prop({ default: 'Năm học 1 TCN - 1 SCN', required: true }) tenNam: string;

    @Prop({ default: 1 }) namBatDau: string;

    @Prop({ default: 1 }) namKetThuc: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], default: [] })
    tuanHoc: TuanHoc[];
}

export const NamHocSchema = SchemaFactory.createForClass(NamHoc);
