import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LopHocDto } from './lop-hoc.dto';

export class LopHocResponse extends PartialType(LopHocDto) {
    @ApiProperty({
        name: 'id',
        type: String,
        required: true,
        example: '60bxxxxxxxxxxxxxxxxxxx',
        description: '_id lớp học trong CSDL',
    })
    id: string;
}
