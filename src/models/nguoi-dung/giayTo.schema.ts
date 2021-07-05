import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class GiayTo {
    @Prop({ required: true }) maSo: string;
    @Prop({ required: true }) ngayCap: string;
    @Prop({ required: true }) noiCap: string;
}
export const GiayToSchema = SchemaFactory.createForClass(GiayTo);
