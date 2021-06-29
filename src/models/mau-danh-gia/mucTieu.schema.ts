import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LuaChon, LuaChonSchema } from './luaChon.schema';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class MucTieu {
    @Prop({ required: true })
    noiDung: string;

    @Prop({ required: true, type: [LuaChonSchema] })
    luaChon: LuaChon[];
}

export const MucTieuSchema = SchemaFactory.createForClass(MucTieu);
