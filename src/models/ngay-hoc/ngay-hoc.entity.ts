import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DanhGia } from '../danh-gia/danh-gia.entity';
import { TietHoc } from '../tiet-hoc/tiet-hoc.entity';
import { TuanHoc } from '../tuan-hoc/tuan-hoc.entity';

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

    @Prop() ghiChu: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'tuan_hoc',
    })
    tuanHoc: TuanHoc;

    @Prop({
        required: true,
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'tiet_hoc',
            },
        ],
    })
    tietHoc: TietHoc[];

    @Prop({
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'danh_gia',
            },
        ],
    })
    danhGia: DanhGia[];
}

export const NgayHocSchema = SchemaFactory.createForClass(NgayHoc);
