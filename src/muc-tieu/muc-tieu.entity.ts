import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type MucTieuDocument = MucTieu & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiem_tao',
        updatedAt: 'thoiDiem_sua',
    },
    versionKey: false,
})
export class MucTieu {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'maMT',
        description: 'Mã định danh mục tiêu',
    })
    @Prop({ required: true, index: true, unique: true })
    maMT: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'noiDung',
        description: 'Nội dung của mục tiêu',
    })
    @Prop({ required: true })
    noiDung: string;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 5,
        type: 'number',
        name: 'diemDG',
        description: 'Điểm đánh giá cho mục tiêu',
    })
    @Prop({ required: true, min: 0, max: 5, default: 0 })
    diemDG: number;

    @ApiProperty({
        required: true,
        default: 1,
        minimum: 1,
        type: 'number',
        name: 'trongSo',
        description: 'Trọng số của mục tiêu trong tiêu chí',
    })
    @Prop({ required: true, default: 1, min: 1 })
    trongSo: number;
}

export const MucTieuSchema = SchemaFactory.createForClass(MucTieu);
