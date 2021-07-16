import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DanhGia } from '../danh-gia/danh-gia.entity';
import { HocKy } from '../hoc-ky/hoc-ky.entity';

export type TuanHocDocument = TuanHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TuanHoc {
    @Prop({ default: 0, required: true }) soTuan: number;

    @Prop({ default: 'Tuần 0', required: true }) tenTuan: string;

    @Prop({ default: Date.now() }) ngayBatDau: string;

    @Prop({ default: Date.now() }) ngayKetThuc: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'hoc_ky',
    })
    hocKy: HocKy;
}

export const TuanHocSchema = SchemaFactory.createForClass(TuanHoc);
