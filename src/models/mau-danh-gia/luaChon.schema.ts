import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class LuaChon {
    @Prop({ required: true })
    noiDung: string;

    @Prop({ required: true, min: 0, max: 10 })
    diemSo: number;
}

export const LuaChonSchema = SchemaFactory.createForClass(LuaChon);
