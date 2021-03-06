import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type MonHocDocument = MonHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class MonHoc {
    @Prop({ required: true, index: true, unique: true })
    maMH: string;

    @Prop({ required: true }) tenMH: string;

    @Prop({
        required: true,
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'nguoi_dung',
            },
        ],
    })
    giaoVien: NguoiDung[];
}

export const MonHocSchema = SchemaFactory.createForClass(MonHoc);
