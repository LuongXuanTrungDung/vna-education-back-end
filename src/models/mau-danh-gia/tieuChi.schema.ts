import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

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

    @Prop({ required: true })
    mucTieu: string[];
}

export const TieuChiSchema = SchemaFactory.createForClass(TieuChi);
