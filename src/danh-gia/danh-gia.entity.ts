import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { TietHoc } from '../tiet-hoc/tiet-hoc.entity';
import { TieuChi } from '../tieu-chi/tieu-chi.entity';

export type DanhGiaDocument = DanhGia & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DanhGia {
    @Prop({ required: true, index: true, unique: true })
    maDG: string;

    @Prop({ required: true })
    tenDG: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    nguoiDG: NguoiDung;

    @Prop({
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'tiet_hoc',
            },
        ],
    })
    tietHoc: TietHoc;

    @Prop({ required: true, default: false })
    trangThai: boolean;

    @Prop() gopY: string;

    @Prop({
        type: [
            {
                type: MongooseSchema.Types.ObjectId,
                ref: 'tieu_chi',
            },
        ],
    })
    tieuChi: TieuChi[];

    @Prop({ default: 0, min: 0, max: 5 })
    diemTrungBinh: number;
}

export const DanhGiaSchema = SchemaFactory.createForClass(DanhGia);
