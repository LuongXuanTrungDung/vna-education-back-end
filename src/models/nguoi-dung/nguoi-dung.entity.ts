import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { GiayTo, GiayToSchema } from './giayTo.schema';
import { LaoDong, LaoDongSchema } from './laoDong.schema';

export type NguoiDungDocument = NguoiDung & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class NguoiDung {
    @Prop({ required: true, index: true, unique: true })
    maND: string;

    @Prop({ required: true })
    hoTen: string;

    @Prop({ default: '' })
    emailND: string;

    @Prop({ required: true })
    matKhau: string;

    @Prop({ default: '' })
    soDienThoai: string;

    @Prop({ required: true })
    ngaySinh: string;

    @Prop({ required: true })
    noiSinh: string;

    @Prop({ required: true })
    diaChi: string;

    @Prop({ required: true })
    gioiTinh: string;

    @Prop({ required: true })
    danToc: string;

    @Prop({ required: true, default: 'Việt Nam' })
    quocTich: string;

    @Prop({ type: GiayToSchema, default: {} })
    cccd: GiayTo;

    @Prop({ type: GiayToSchema, default: {} })
    hoChieu: GiayTo;

    @Prop({ type: LaoDongSchema, default: {} })
    chucVu: LaoDong;

    @Prop({
        ref: 'lop_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    lopHoc: LopHoc;

    @Prop({ default: '' }) ngayNhapHoc: string;

    @Prop({
        ref: 'lop_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    chuNhiem: LopHoc;

    @Prop({ default: true })
    dangHoatDong: boolean;

    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'nguoi_dung' }],
    })
    conCai: NguoiDung[];
}

export const NguoiDungSchema = SchemaFactory.createForClass(NguoiDung);
