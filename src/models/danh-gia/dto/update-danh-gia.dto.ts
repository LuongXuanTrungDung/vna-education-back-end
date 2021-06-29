import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateDanhGiaDto } from './create-danh-gia.dto';

export class UpdateDanhGiaDto extends PartialType(CreateDanhGiaDto) {
    @ApiProperty({
        required: true,
        default: false,
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
        default: [],
        name: 'diemForm',
        description: 'Điểm số đánh giá',
        type: 'array',
        example: '[{2,[3.5,4]}]',
    })
    diemForm: any[];

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
