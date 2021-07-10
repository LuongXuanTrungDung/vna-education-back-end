import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TheoHK {
    @Prop({ enum: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém'] })
    hocLuc: string;

    @Prop({ enum: ['Tốt', 'Khá', 'Trung bình', 'Yếu', 'Kém'] })
    hanhKiem: string;
}
export const TheoHKSchema = SchemaFactory.createForClass(TheoHK);
