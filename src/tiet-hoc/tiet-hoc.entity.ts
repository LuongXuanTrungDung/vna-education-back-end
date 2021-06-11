import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DanhGia } from '../danh-gia/danh-gia.entity';
import { DiemDanh } from '../diem-danh/diem-danh.entity';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NgayHoc } from '../ngay-hoc/ngay-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type TietHocDocument = TietHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TietHoc {
    @Prop({ required: true, index: true, unique: true })
    maTH: string;

    @Prop() moTa: string;

    @Prop({
        required: true,
        ref: 'nguoi_dung',
        type: MongooseSchema.Types.ObjectId,
    })
    giaoVien: NguoiDung;

    @Prop({
        required: true,
        ref: 'ngay_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    ngayHoc: NgayHoc;

    @Prop({
        required: true,
        ref: 'mon_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    monHoc: MonHoc;

    @Prop({
        required: true,
        ref: 'lop_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    lopHoc: LopHoc;

    @Prop({
        required: true,
        type: [
            {
                ref: 'diem_danh',
                type: MongooseSchema.Types.ObjectId,
            },
        ],
    })
    diemDanh: DiemDanh[];

    @Prop({
        required: true,
        type: [
            {
                ref: 'danh_gia',
                type: MongooseSchema.Types.ObjectId,
            },
        ],
    })
    danhGia: DanhGia[];
}

export const TietHocSchema = SchemaFactory.createForClass(TietHoc);
