import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class hoChieu {
    @Prop({ required: true }) maSo: string;
    @Prop({ required: true }) ngayCap: Date;
    @Prop({ required: true }) noiCap: string;
}
export const hoChieuSchema = SchemaFactory.createForClass(hoChieu);
