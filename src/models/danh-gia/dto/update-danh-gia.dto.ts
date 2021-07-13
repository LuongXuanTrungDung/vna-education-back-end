import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDanhGiaDto } from './create-danh-gia.dto';

export class UpdateDanhGiaDto extends PartialType(CreateDanhGiaDto) {
    @ApiProperty({
        required: true,
        name: 'chiTiet',
        type: 'array',
        description: 'Chi tiết của đánh giá',
    })
    chiTiet: any[];
}
