import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class giayTo {
    @Prop({ required: true }) maSo: string;
    @Prop({ required: true }) ngayCap: Date;
    @Prop({ required: true }) noiCap: string;
}
export const giayToSchema = SchemaFactory.createForClass(giayTo);
