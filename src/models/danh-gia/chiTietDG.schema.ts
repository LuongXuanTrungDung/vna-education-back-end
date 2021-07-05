import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class ChiTietDG {
    @ApiProperty({
        name: 'nguoiDG',
        required: true,
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Học sinh hay phụ huynh làm đánh giá',
    })
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'nguoi_dung',
    })
    nguoiDG: NguoiDung;

    @ApiProperty({
        name: 'diemDG',
        required: true,
        minimum: 0,
        maximum: 10,
        default: 0,
        description: 'Điểm đánh giá trung bình cuối cùng',
    })
    @Prop({
        required: true,
        min: 0,
        max: 10,
        default: 0,
    })
    diemDG: number;

    @ApiProperty({
        name: 'gopY',
        required: true,
        default: '',
        example: 'abcd',
        description: 'Ghi chú thêm của người đánh giá',
    })
    @Prop({ default: '', required: true })
    gopY: string;

    @ApiProperty({
        name: 'trangThai',
        required: true,
        default: false,
        description: 'Trạng thái của đánh giá, đã làm hay chưa',
    })
    @Prop({ required: true, default: false })
    trangThai: boolean;
}

export const ChiTietDGSchema = SchemaFactory.createForClass(ChiTietDG);
