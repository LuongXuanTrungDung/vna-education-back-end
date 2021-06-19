import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NgayHoc } from '../ngay-hoc/ngay-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { TieuChi, TieuChiSchema } from './tieuChi.schema';

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

    @Prop() gopY: string;

    @Prop({
        type: [TieuChiSchema],
    })
    tieuChi: TieuChi[];

    @Prop({ required: true, default: 0, min: 0, max: 5 })
    diemDG: number;
}

export const DanhGiaSchema = SchemaFactory.createForClass(DanhGia);
