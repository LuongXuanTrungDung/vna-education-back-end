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
export class ChiTietDG {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    nguoiDG: NguoiDung;

    @Prop({
        min: 0,
        max: 10,
        default: 0,
    })
    diemDG: number;

    @Prop({ default: '' })
    gopY: string;

    @Prop({ default: false })
    trangThai: boolean;

    @Prop({ default: [] })
    formDG: any[];
}

export const ChiTietDGSchema = SchemaFactory.createForClass(ChiTietDG);
