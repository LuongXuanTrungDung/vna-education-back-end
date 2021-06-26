import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { TheoHK, TheoHKSchema } from './theoHK.schema';

@Schema()
export class ChiTietBD {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'mon_hoc',
    })
    monHoc: MonHoc;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
        required: true,
    })
    giaoVien: NguoiDung;

    @Prop({ type: TheoHKSchema })
    hocKy1: TheoHK;

    @Prop({ type: TheoHKSchema })
    hocKy2: TheoHK;

    @Prop() nhanXet: string;
}
export const ChiTietBDSchema = SchemaFactory.createForClass(ChiTietBD);