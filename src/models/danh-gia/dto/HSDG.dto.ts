import { ApiProperty, PartialType } from '@nestjs/swagger';
import { NguoiDung } from '../../nguoi-dung/nguoi-dung.entity';

export class HSDGDto {
    @ApiProperty({
        required: true,
        name: 'nguoiDG',
        type: String,
        description: '_id của người thực hiện đánh giá',
        example: '60bxxxxxxxxxxxxx',
    })
    nguoiDG: NguoiDung;

    @ApiProperty({
        required: true,
        default: true,
        name: 'trangThai',
        type: Boolean,
        description: 'Trạng thái đánh giá',
    })
    trangThai: boolean;

    @ApiProperty({
        required: true,
        default: '',
        example: 'abcd',
        name: 'gopY',
        type: String,
        description: 'Ghi chú thêm của người đánh giá',
    })
    gopY: string;

    @ApiProperty({
        required: true,
        default: 0,
        minimum: 0,
        maximum: 10,
        name: 'diemDG',
        type: Number,
        example: 6.7,
        description: 'Điểm trung bình của đánh giá',
    })
    diemDG: number;
}
