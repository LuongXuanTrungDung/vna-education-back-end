import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TietHoc } from '../tiet-hoc/tiet-hoc.entity';

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

    @Prop({ default: [], type: [{ type: MongooseSchema.Types.ObjectId }] })
    tietHoc: TietHoc[];
}

export const BuoiHocSchema = SchemaFactory.createForClass(BuoiHoc);
