import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BuoiHoc } from '../buoi-hoc/buoi-hoc.entity';
import { DiemDanh } from '../diem-danh/diem-danh.entity';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { MonHoc } from '../mon-hoc/mon-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

export type TietHocDocument = TietHoc & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class TietHoc {
    @Prop({
        required: true,
        ref: 'nguoi_dung',
        type: MongooseSchema.Types.ObjectId,
    })
    giaoVien: NguoiDung;

    @Prop({
        required: true,
        ref: 'mon_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    monHoc: MonHoc;

    @Prop({
        required: true,
        ref: 'lop_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    lopHoc: LopHoc;

    @Prop({
        default: 'Tiết 0',
    })
    thuTiet: string;

    @Prop({
        default: '0h',
    })
    thoiGian_batDau: string;

    @Prop({
        required: true,
        ref: 'buoi_hoc',
        type: MongooseSchema.Types.ObjectId,
    })
    buoiHoc: BuoiHoc;

    @Prop({
        type: [
            {
                ref: 'diem_danh',
                type: MongooseSchema.Types.ObjectId,
            },
        ],
    })
    diemDanh: DiemDanh[];
}

export const TietHocSchema = SchemaFactory.createForClass(TietHoc);
