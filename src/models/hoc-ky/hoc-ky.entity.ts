import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DanhGia } from '../danh-gia/danh-gia.entity';
import { TuanHoc } from '../tuan-hoc/tuan-hoc.entity';

export type HocKyDocument = HocKy & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class HocKy {
    @Prop({ required: true, index: true, unique: true })
    tenHK: string;

    @Prop({ default: Date.now() }) ngayBatDau: string;

    @Prop({ default: Date.now() }) ngayKetThuc: string;
}

export const HocKySchema = SchemaFactory.createForClass(HocKy);
