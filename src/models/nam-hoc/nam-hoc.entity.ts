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
    @Prop({ default: '', required: true }) tenNam: string;

    @Prop({ default: 1 }) namBatDau: number;

    @Prop({ default: 1 }) namKetThuc: number;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], default: [] })
    tuanHoc: TuanHoc[];
}

export const NamHocSchema = SchemaFactory.createForClass(NamHoc);
