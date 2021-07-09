import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class LaoDong {
    @Prop({ required: true }) chucVu: string;

    @Prop({required: true}) hopDong: string

    @Prop({ required: true }) trinhDo: string;
}
export const LaoDongSchema = SchemaFactory.createForClass(LaoDong);
