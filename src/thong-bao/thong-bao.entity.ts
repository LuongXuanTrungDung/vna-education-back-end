import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThongBaoDocument = ThongBao & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class ThongBao {
    @Prop({ required: true, index: true, unique: true })
    maTB: string;

    @Prop({
        required: true,
        default: 'Thông báo chung',
        enum: ['Học phí', 'Thời khóa biểu', 'Thông báo chung', 'Sự kiện'],
    })
    loaiTB: string;

    @Prop({ required: true })
    nguoiDang: string;

    @Prop({ required: true })
    tieuDe: string;

    @Prop({ required: true })
    tomTat: string;

    @Prop({ required: true })
    noiDung: string;

    @Prop({ required: true, default: true })
    daDuyet: boolean;
}

export const ThongBaoSchema = SchemaFactory.createForClass(ThongBao);
