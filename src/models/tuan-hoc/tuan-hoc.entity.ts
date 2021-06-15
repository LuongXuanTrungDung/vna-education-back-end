import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DanhGia } from '../danh-gia/danh-gia.entity';
import { HocKy } from '../hoc-ky/hoc-ky.entity';
import { NgayHoc } from '../ngay-hoc/ngay-hoc.entity';

export type TuanHocDocument = TuanHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TuanHoc {
    @Prop({ required: true, index: true, unique: true })
    maTuan: string;

    @Prop() ghiChu: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'hoc_ky',
    })
    hocKy: HocKy;

    @Prop({
        required: true,
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'ngay_hoc',
            },
        ],
    })
    ngayHoc: NgayHoc[];

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

export const TuanHocSchema = SchemaFactory.createForClass(TuanHoc);
