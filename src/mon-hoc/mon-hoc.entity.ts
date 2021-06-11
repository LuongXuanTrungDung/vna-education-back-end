import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DanhGia } from '../danh-gia/danh-gia.entity';
import { TietHoc } from '../tiet-hoc/tiet-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type MonHocDocument = MonHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class MonHoc {
    @Prop({ required: true, index: true, unique: true })
    maMH: string;

    @Prop({ required: true }) tenMH: string;

    @Prop({ required: true, default: 0, min: 0 })
    soTiet: number;

    @Prop() moTa: string;

    @Prop({
        required: true,
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'nguoi_dung',
            },
        ],
    })
    giaoVien: NguoiDung[];

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

export const MonHocSchema = SchemaFactory.createForClass(MonHoc);