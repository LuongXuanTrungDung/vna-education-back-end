import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class LopHocDto {
    @ApiProperty({
        name: 'maLH',
        type: String,
        required: true,
        example: '13A4',
        description: 'Tên lớp học',
    })
    @IsNotEmpty()
    @IsString()
    maLH: string;

    @ApiProperty({
        name: 'GVCN',
        type: String,
        required: true,
        example: '60bxxxxxxxxxxxxx',
        description: 'Giáo viên chủ nhiệm của lớp',
    })
    @IsNotEmpty()
    @IsString()
    GVCN: string;

    @ApiProperty({
        name: 'hocSinh',
        type: 'array',
        required: true,
        example: "['60bxxxxxxxxxxxxx', '60bxxxxxxxxxxxxy']",
        description: 'Các học sinh của lớp',
        minItems: 1,
        uniqueItems: true,
        default: [],
    })
    @IsArray()
    hocSinh: string[];
}
