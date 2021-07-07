import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

    @Prop({ required: true }) id: number;

    @Prop() noiDung: string;

    @Prop({
        required: true,
        type: [MucTieuSchema],
    })
    mucTieu: MucTieu[];
}

export const TieuChiSchema = SchemaFactory.createForClass(TieuChi);
