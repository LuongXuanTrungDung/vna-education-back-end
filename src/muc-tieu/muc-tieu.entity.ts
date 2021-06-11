import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LuaChon, LuaChonSchema } from './luaChon.schema';

export type MucTieuDocument = MucTieu & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class MucTieu {
    @Prop({ required: true, index: true, unique: true })
    maMT: string;

    @Prop({ required: true })
    noiDung: string;

    @Prop({ required: true, default: 1, min: 1, max: 10 })
    trongSo: number;

    @Prop({ type: [{ type: LuaChonSchema }] })
    luaChon: LuaChon;
}

export const MucTieuSchema = SchemaFactory.createForClass(MucTieu);
