import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NgayHoc } from '../ngay-hoc/ngay-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type ThongBaoDocument = ThongBao & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class ThongBao {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    nguoiDang: NguoiDung;

    @Prop({ required: true })
    tieuDe: string;

    @Prop({ required: true })
    tomTat: string;

    @Prop({ required: true })
    noiDung: string;

    @Prop({
        required: true,
        default: 'Khác',
        enum: ['Hoạt động', 'Học phí', 'Học tập', 'Khác'],
    })
    danhMuc: string;

    @Prop({required: true,})
    ngayDang: string

    @Prop({ required: true, default: true })
    daDuyet: boolean;
}

export const ThongBaoSchema = SchemaFactory.createForClass(ThongBao);
