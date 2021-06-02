import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ThongBaoDocument = ThongBao & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class ThongBao {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'maTB',
        description: 'Mã định danh thông báo, gồm danh mục thông báo',
    })
    @Prop({ required: true, index: true, unique: true })
    maTB: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'nguoiDang',
        description: 'Người đăng thông báo',
    })
    @Prop({ required: true })
    nguoiDang: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'tieuDe',
        description: 'Tiêu đề thông báo',
    })
    @Prop({ required: true })
    tieuDe: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'tomTat',
        description: 'Tóm tắt nội dung thông báo',
    })
    @Prop({ required: true })
    tomTat: boolean;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'gopY',
        description: 'Nội dung chi tiết thông báo',
    })
    @Prop({ required: true })
    noiDung: string;

    @ApiProperty({
        required: true,
        default: false,
        type: 'boolean',
        name: 'tieuChi',
        description: 'Trạng thái duyệt thông báo',
    })
    @Prop({ required: true, default: false })
    daDuyet: string[];
}

export const ThongBaoSchema = SchemaFactory.createForClass(ThongBao);
