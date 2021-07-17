import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class LaoDong {
    @Prop() chucVu: string;
    @Prop() hopDong: string;
    @Prop() trinhDo: string;
}
export const LaoDongSchema = SchemaFactory.createForClass(LaoDong);
