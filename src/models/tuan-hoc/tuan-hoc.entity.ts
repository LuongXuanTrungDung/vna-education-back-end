import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BuoiHoc } from '../buoi-hoc/buoi-hoc.entity';

export type TuanHocDocument = TuanHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TuanHoc {
    @Prop({ default: 0, required: true })
    soTuan: number;

    @Prop({ default: 'Tuần 0', required: true })
    tenTuan: string;

    @Prop({ default: Date.now() })
    ngayBatDau: string;

    @Prop({ default: Date.now() })
    ngayKetThuc: string;

    @Prop({ required: true })
    hocKy: number;

    @Prop({ default: [], type: [{ type: MongooseSchema.Types.ObjectId }] })
    buoiHoc: BuoiHoc[];
}

export const TuanHocSchema = SchemaFactory.createForClass(TuanHoc);
