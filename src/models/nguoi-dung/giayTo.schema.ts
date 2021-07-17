import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class GiayTo {
    @Prop() maSo: string;
    @Prop() ngayCap: string;
    @Prop() noiCap: string;
}
export const GiayToSchema = SchemaFactory.createForClass(GiayTo);
