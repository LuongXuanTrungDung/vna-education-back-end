import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ChiTietDG, ChiTietDGSchema } from '../chiTietDG.schema';
import { CreateDanhGiaDto } from './create-danh-gia.dto';

export class UpdateDanhGiaDto extends PartialType(CreateDanhGiaDto) {
	@ApiProperty({
        required: true,
        name: 'chiTiet',
        type: [ChiTietDGSchema],
        description: 'Chi tiết của đánh giá',
    })
    chiTiet: ChiTietDG[];
}
