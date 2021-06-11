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
    maHK: string;

    @Prop() ghiChu: string;

    @Prop({
        required: true,
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'tuan_hoc',
            },
        ],
    })
    tuanHoc: TuanHoc[];

    @Prop({
        required: true,
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'danh_gia',
            },
        ],
    })
    danhGia: DanhGia[];
}

export const HocKySchema = SchemaFactory.createForClass(HocKy);
