import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TuanHoc } from '../tuan-hoc/tuan-hoc.entity';

export type BuoiHocDocument = BuoiHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class BuoiHoc {
    @Prop({ default: 'Chủ nhật', required: true })
    thu: string;

    @Prop({ default: '1/1/1 AD', required: true })
    ngayHoc: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'tuan_hoc',
    })
    tuanHoc: TuanHoc;
}

export const BuoiHocSchema = SchemaFactory.createForClass(BuoiHoc);
