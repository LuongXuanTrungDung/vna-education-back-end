import { PartialType } from '@nestjs/swagger';
import { CreateDiemDanhDto } from './create-diem-danh.dto';

export class UpdateDiemDanhDto extends PartialType(CreateDiemDanhDto) {}
