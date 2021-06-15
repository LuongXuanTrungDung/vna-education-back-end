import { PartialType } from '@nestjs/swagger';
import { CreateThongBaoDto } from './create-thong-bao.dto';

export class UpdateThongBaoDto extends PartialType(CreateThongBaoDto) {}
