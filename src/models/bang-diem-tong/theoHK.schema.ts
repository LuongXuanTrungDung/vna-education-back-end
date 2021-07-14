import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TheoHK {
    @Prop({ default: '' })
    hocLuc: string;

    @Prop({ default: '' })
    hanhKiem: string;
}
export const TheoHKSchema = SchemaFactory.createForClass(TheoHK);
