import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DanhGia } from '../danh-gia/danh-gia.entity';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { giayTo, giayToSchema } from './giayTo.schema';
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

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'danh_gia' }] })
    danhGia: DanhGia[];

    @Prop({ required: true })
    hoTen: string;

    @Prop()
    emailND: string;

    @Prop({ required: true })
    matKhau: string;

    @Prop()
    soDienThoai: string;

    @Prop({ required: true })
    ngaySinh: Date;

    @Prop({ required: true })
    diaChi: string;

    @Prop({ required: true, enum: ['Nam', 'Nữ', 'Khác'] })
    gioiTinh: string;

    @Prop({ required: true })
    danToc: string;

    @Prop({ required: true, default: 'Việt Nam' })
    quocTich: string;

    @Prop({ type: giayToSchema })
    cccd: giayTo;

    @Prop({ type: giayToSchema })
    hoChieu: giayTo;

    @Prop({ type: LaoDongSchema })
    chucVu: LaoDong;

    @Prop({
        ref: 'lop_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    lopHoc: LopHoc;

    @Prop() ngayNhapHoc: Date;

    @Prop({
        ref: 'lop_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    chuNhiem: LopHoc;

    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'nguoi_dung' }],
    })
    conCai: NguoiDung[];
}

export const NguoiDungSchema = SchemaFactory.createForClass(NguoiDung);