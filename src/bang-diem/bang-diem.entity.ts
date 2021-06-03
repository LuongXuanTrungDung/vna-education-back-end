import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type BangDiemDocument = BangDiem & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class BangDiem {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'maBD',
        description: 'Mã định danh bảng điểm',
    })
    @Prop({ required: true, index: true, unique: true })
    maBD: string;

    @ApiProperty({
        required: true,
        enum: [],
        type: 'string',
        name: 'monHoc',
        description: 'Môn học của bảng điểm',
    })
    @Prop({ required: true, enum: [] })
    monHoc: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'giaoVien',
        description: 'Giáo viên chịu trách nhiệm cho bảng điểm',
    })
    @Prop({ required: true })
    giaoVien: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'hocSinh',
        description: 'Bảng điểm của học sinh',
    })
    @Prop({ required: true })
    hocSinh: string;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 10,
        type: 'number',
        name: 'kiemTra_mieng',
        description: 'Điểm kiểm tra miệng',
    })
    @Prop({ required: true, min: 0, max: 10, default: 0 })
    kiemTra_mieng: number;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 10,
        type: 'number',
        name: 'kiemTra_15phut',
        description: 'Điểm kiểm tra 15 phút',
    })
    @Prop({ required: true, min: 0, max: 10, default: 0 })
    kiemTra_15phut: number;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 10,
        type: 'number',
        name: 'kiemTra_1tiet',
        description: 'Điểm kiểm tra 1 tiết',
    })
    @Prop({ required: true, min: 0, max: 10, default: 0 })
    kiemTra_1tiet: number;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 10,
        type: 'number',
        name: 'thi_HK1',
        description: 'Điểm thi học kỳ 1',
    })
    @Prop({ required: true, min: 0, max: 10, default: 0 })
    thi_HK1: number;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 10,
        type: 'number',
        name: 'thi_HK2',
        description: 'Điểm thi học kỳ 2',
    })
    @Prop({ required: true, min: 0, max: 10, default: 0 })
    thi_HK2: number;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 10,
        type: 'number',
        name: 'diemTrungBinh',
        description: 'Điểm trung bình của học sinh',
    })
    @Prop({ required: true, min: 0, max: 10, default: 0 })
    diemTrungBinh: number;
}

export const BangDiemSchema = SchemaFactory.createForClass(BangDiem);
