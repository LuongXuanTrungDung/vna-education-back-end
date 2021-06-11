import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CCCD {
    @Prop({ required: true }) maSo: string;
    @Prop({ required: true }) ngayCap: Date;
    @Prop({ required: true }) noiCap: string;
}
export const CCCDSchema = SchemaFactory.createForClass(CCCD);
