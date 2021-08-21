import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NamHoc } from '../nam-hoc/nam-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type LopHocDocument = LopHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class LopHoc {
    @Prop({ required: true, index: true, unique: true })
    maLH: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nam_hoc',
    })
    namHoc: NamHoc;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    GVCN: NguoiDung;

    @Prop({
        default: [],
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'nguoi_dung',
            },
        ],
    })
    hocSinh: NguoiDung[];
}

export const LopHocSchema = SchemaFactory.createForClass(LopHoc);
