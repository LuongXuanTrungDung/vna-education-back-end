import { ApiProperty } from '@nestjs/swagger';
import { NguoiDung } from '../../nguoi-dung/nguoi-dung.entity';

export class CreateLopHocDto {
    @ApiProperty({
        name: 'maLH',
        type: String,
        required: true,
        example: '13A4',
        description: 'Tên lớp học',
    })
    maLH: string;

    @ApiProperty({
        name: 'chuNhiem',
        type: String,
        required: true,
        example: '60bxxxxxxxxxxxxx',
        description: 'Giáo viên chủ nhiệm của lớp',
    })
    chuNhiem: NguoiDung;

    @ApiProperty({
        name: 'hocSinh',
        type: 'array',
        required: true,
        example: "['60bxxxxxxxxxxxxx', '60bxxxxxxxxxxxxy']",
        description: 'Các học sinh của lớp',
        minItems: 1,
        uniqueItems: true,
    })
    hocSinh: NguoiDung[];
}
