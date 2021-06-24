import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MucTieu, MucTieuSchema } from './mucTieu.schema';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TieuChi {
    @Prop({ required: true })
    tenTC: string;

    @Prop() moTa: string;

    @Prop({ required: true, default: 1, min: 1, max: 10 })
    trongSo: number;

    @Prop({
        required: true,
        type: [MucTieuSchema],
    })
    mucTieu: MucTieu[];
}

export const TieuChiSchema = SchemaFactory.createForClass(TieuChi);
