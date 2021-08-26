import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type QuenMatKhauDocument = QuenMatKhau & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class QuenMatKhau {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        required: true,
        ref: 'nguoi_dung',
    })
    nguoiDung: NguoiDung;
    @Prop({ required: true }) emailND: string;
    @Prop({ default: true }) conHan: boolean;
}

export const QuenMatKhauSchema = SchemaFactory.createForClass(QuenMatKhau);
