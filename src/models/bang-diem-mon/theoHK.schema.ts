import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TheoHK {
    @Prop({})
    kiemTra_mieng: number[];

    @Prop({})
    kiemTra_15phut: number[];

    @Prop({})
    kiemTra_1tiet: number[];

    @Prop()
    thiHK: number[];

    @Prop({
        min: 0,
        default: 0,
        max: 10,
    })
    diemTong: number;
}
export const TheoHKSchema = SchemaFactory.createForClass(TheoHK);
