import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { ChiTietBD, ChiTietBDSchema } from './chiTietBD.schema';

export type BangDiemDocument = BangDiem & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class BangDiem {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
        required: true,
    })
    hocSinh: NguoiDung;

    @Prop({ required: true, type: [ChiTietBDSchema] })
    chiTiet: ChiTietBD[];

    @Prop({ min: 0, max: 10, default: 0 })
    diemTB_caNam: number;

    @Prop() nhanXet: string;

    @Prop({ enum: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém'] })
    xepLoai: string;

    @Prop({ enum: ['Tốt', 'Khá', 'Trung bình', 'Yếu', 'Kém'] })
    hanhKiem: string;
}

export const BangDiemSchema = SchemaFactory.createForClass(BangDiem);
