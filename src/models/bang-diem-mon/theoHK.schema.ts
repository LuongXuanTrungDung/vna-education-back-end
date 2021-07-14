import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TheoHK {
    @Prop({ default: [] })
    kiemTra_mieng: number[];

    @Prop({ default: [] })
    kiemTra_15phut: number[];

    @Prop({ default: [] })
    kiemTra_1tiet: number[];

    @Prop({
        min: 0,
        default: 0,
        max: 10,
    })
    thiHK: number;

    @Prop({
        min: 0,
        default: 0,
        max: 10,
    })
    diemTong: number;
}
export const TheoHKSchema = SchemaFactory.createForClass(TheoHK);
