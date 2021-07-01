import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class ChiTietDG {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    nguoiDG: NguoiDung;

    @Prop({
        required: true,
        min: 0,
        max: 10,
        default: 0,
    })
    diemDG: number;

    @Prop({ default: '', required: true })
    gopY: string;

    @Prop({ required: true, default: false })
    trangThai: boolean;
}

export const ChiTietDGSchema = SchemaFactory.createForClass(ChiTietDG);
