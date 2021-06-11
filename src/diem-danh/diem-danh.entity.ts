import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TietHoc } from '../tiet-hoc/tiet-hoc.entity';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type DiemDanhDocument = DiemDanh & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DiemDanh {
    @Prop({ required: true, index: true, unique: true })
    maDD: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    giaoVien: NguoiDung;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    hocSinh: NguoiDung;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'tiet_hoc',
    })
    tietHoc: TietHoc;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'lop_hoc',
    })
    lopHoc: LopHoc;

    @Prop({ required: true, default: true })
    trangThai: boolean;

    @Prop() ghiChu: string;
}

export const DiemDanhSchema = SchemaFactory.createForClass(DiemDanh);
