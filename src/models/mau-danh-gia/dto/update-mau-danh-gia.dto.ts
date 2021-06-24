import { PartialType } from '@nestjs/swagger';
import { CreateMauDanhGiaDto } from './create-mau-danh-gia.dto';

export class UpdateMauDanhGiaDto extends PartialType(CreateMauDanhGiaDto) {}
