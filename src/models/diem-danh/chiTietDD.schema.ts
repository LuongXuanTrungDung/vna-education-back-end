import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class ChiTietDD {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    hocSinh: NguoiDung;

    @Prop() ghiChu: string;

    @Prop({ required: true, default: true })
    trangThai: boolean;
}

export const ChiTietDDSchema = SchemaFactory.createForClass(ChiTietDD);
