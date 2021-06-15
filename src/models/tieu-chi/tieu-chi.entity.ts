import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MucTieu } from '../muc-tieu/muc-tieu.entity';

export type TieuChiDocument = TieuChi & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TieuChi {
    @Prop({ required: true, index: true, unique: true })
    maTC: string;

    @Prop({ required: true })
    tenTC: string;

    @Prop() chiTiet: string;

    @Prop({ required: true, default: 1, min: 1, max: 10 })
    trongSo: number;

    @Prop({
        required: true,
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'muc_tieu',
            },
        ],
    })
    mucTieu: MucTieu[];
}

export const TieuChiSchema = SchemaFactory.createForClass(TieuChi);
