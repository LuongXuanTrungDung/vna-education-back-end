import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TheoHK {
    @Prop({ default: '' })
    hocLuc: string;

    @Prop({ default: '' })
    hanhKiem: string;

    @Prop({ min: 0, max: 10, default: 0 })
    diemTB: number;
}
export const TheoHKSchema = SchemaFactory.createForClass(TheoHK);
