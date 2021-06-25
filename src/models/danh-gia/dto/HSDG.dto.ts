import { ApiProperty } from '@nestjs/swagger';

export class HSDGDto {
    @ApiProperty({
        name: 'trangThai',
        type: 'boolean',
        description: 'Trạng thái đánh giá',
    })
    trangThai: boolean;

    @ApiProperty({
        name: 'gopY',
        type: 'string',
        description: 'Ghi chú thêm của người đánh giá',
    })
    gopY: string;

    @ApiProperty({
        name: 'diemForm',
        type: 'array',
        description: 'Điểm đánh giá cho từng tiêu chí và mục tiêu',
    })
    diemForm: any[];

    @ApiProperty({
        name: 'diemDG',
        type: 'number',
        description: 'Điểm trung bình của đánh giá',
    })
    diemDG: number;
}
