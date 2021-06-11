import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LaoDong {
    @Prop({ required: true }) chucVu: string;

    @Prop({
        required: true,
        enum: ['Ban giám hiệu', 'Chuyên gia', 'Giáo viên', 'Nhân viên'],
    })
    nhomChucVu: string;

    @Prop({ required: true, enum: ['Đại học', 'Cao đẳng', 'Trung cấp'] })
    trinhDo: string;

    @Prop({ required: true }) hopDong: string;
}
export const LaoDongSchema = SchemaFactory.createForClass(LaoDong);
