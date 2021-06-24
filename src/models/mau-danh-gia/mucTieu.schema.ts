import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class MucTieu {
    @Prop({ required: true })
    noiDung: string;

    @Prop({ required: true, default: 1, min: 1, max: 10 })
    trongSo: number;
}

export const MucTieuSchema = SchemaFactory.createForClass(MucTieu);