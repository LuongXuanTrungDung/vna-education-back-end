import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MauDanhGia } from '../mau-danh-gia/mau-danh-gia.entity';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NgayHoc } from '../ngay-hoc/ngay-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type DanhGiaDocument = DanhGia & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DanhGia {
    @Prop({ required: true })
    tenDG: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    nguoiDG: NguoiDung;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    doiTuongDG: NguoiDung;

    @Prop({
        required: true,
        ref: 'ngay_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    ngayDG: NgayHoc;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'mon_hoc',
    })
    monHoc: MonHoc;

    @Prop({ required: true, default: false })
    trangThai: boolean;

    @Prop({ default: '', required: true }) gopY: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'mau_danh_gia',
    })
    mauDG: MauDanhGia;

    @Prop({ default: [], required: true }) diemForm: any[];

    @Prop({ required: true, default: 0, min: 0, max: 10 })
    diemDG: number;
}

export const DanhGiaSchema = SchemaFactory.createForClass(DanhGia);
