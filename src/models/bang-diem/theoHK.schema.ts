import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TheoHK {
    @Prop({ min: 0, max: 10, default: 0 })
    kiemTra_mieng: number;

    @Prop({ min: 0, max: 10, default: 0 })
    kiemTra_15phut: number;

    @Prop({ min: 0, max: 10, default: 0 })
    kiemTra_1tiet: number;

    @Prop({ min: 0, max: 10, default: 0 })
    thiHK: number;

    @Prop({ min: 0, max: 10, default: 0 })
    diemTong: number;

    @Prop({ enum: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém'] })
    hocLuc: string;

    @Prop({ enum: ['Tốt', 'Khá', 'Trung bình', 'Yếu', 'Kém'] })
    hanhKiem: string;

    @Prop() nhanXet: string;
}
export const TheoHKSchema = SchemaFactory.createForClass(TheoHK);
