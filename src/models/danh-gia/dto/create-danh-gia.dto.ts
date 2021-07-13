import { ApiProperty } from '@nestjs/swagger';

export class CreateDanhGiaDto {
    @ApiProperty({
        required: true,
        name: 'tenDG',
        type: String,
        description: 'Tên gọi của đánh giá',
        example: 'Đánh giá gì đó',
    })
    tenDG: string;

    @ApiProperty({
        required: true,
        name: 'lopDG',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Lớp học có các thành viên tham giá đánh giá',
    })
    lopHoc: string;

    @ApiProperty({
        required: true,
        name: 'monHoc',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Mẫu đánh giá đặc thù dành cho môn học',
    })
    monHoc: string;

    @ApiProperty({
        required: true,
        name: 'giaoVien',
        type: 'array',
        example: '[60bxxxxxxxxxxxxx. 60bxxxxxxxxxxxxxxxy]',
        description: 'Giáo viên được đánh giá',
    })
    giaoVien: string[];

    @ApiProperty({
        required: true,
        name: 'ngayDG',
        type: String,
        example: '21-12-2012',
        description: 'Ngày thực hiện đánh giá',
    })
    ngayDG: string;

    @ApiProperty({
        required: true,
        name: 'choGVCN',
        type: Boolean,
        description: 'Đánh giá có phải cho GVCN',
    })
    choGVCN: boolean;

    @ApiProperty({
        required: true,
        name: 'mauDG',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Mẫu đánh giá',
    })
    mauDG: string;
}
