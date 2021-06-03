import { PartialType } from '@nestjs/swagger';
import { CreateBangDiemDto } from './create-bang-diem.dto';

export class UpdateBangDiemDto extends PartialType(CreateBangDiemDto) {}
