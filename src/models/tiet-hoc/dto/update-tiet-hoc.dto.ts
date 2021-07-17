import { PartialType } from '@nestjs/swagger';
import { CreateTietHocDto } from './create-tiet-hoc.dto';

export class UpdateTietHocDto extends PartialType(CreateTietHocDto) {
    diemDanh: string[];
}
