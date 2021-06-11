import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LuaChon {
    @Prop({ min: 0, max: 5, default: 0 })
    diemSo: number;

    @Prop({ required: true })
    noiDung: string;
}
export const LuaChonSchema = SchemaFactory.createForClass(LuaChon);
