import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
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
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    hocSinh: NguoiDung;

    @Prop({ default: '' }) ghiChu: string;

    @Prop({ default: true })
    trangThai: boolean;
}

export const DiemDanhSchema = SchemaFactory.createForClass(DiemDanh);
