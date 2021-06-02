import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type DanhGiaDocument = DanhGia & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class DanhGia {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'maDG',
        description:
            'Mã định danh đánh giá, gồm tên môn học, tiết học và ngày đánh giá',
    })
    @Prop({ required: true, index: true, unique: true })
    maDG: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'nguoiDG',
        description: 'Người đánh giá',
    })
    @Prop({ required: true })
    nguoiDG: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'doiTuongDG',
        description: 'Đối tượng đánh giá (giáo viên)',
    })
    @Prop({ required: true })
    doiTuongDG: string;

    @ApiProperty({
        required: true,
        default: false,
        type: 'boolean',
        name: 'trangThai',
        description: 'Trạng thái đánh giá',
    })
    @Prop({ required: true, default: false })
    trangThai: boolean;

    @ApiProperty({
        type: 'string',
        required: true,
        default: '',
        name: 'gopY',
        description: 'Ý kiến đánh giá khác',
    })
    @Prop({ required: true, default: '' })
    gopY: string;

    @ApiProperty({
        type: 'array',
        name: 'tieuChi',
        description: 'Các tiêu chí đánh giá',
    })
    @Prop()
    tieuChi: string[];

    @ApiProperty({
        type: 'number',
        default: 0,
        minimum: 0,
        maximum: 5,
        name: 'diemTrungBinh',
        description: 'Điểm số trung bình của các tiêu chí đánh giá',
    })
    @Prop({ default: 0, min: 0, max: 5 })
    diemTrungBinh: string[];
}

export const DanhGiaSchema = SchemaFactory.createForClass(DanhGia);
