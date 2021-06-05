import { PartialType } from '@nestjs/swagger';
import { CreateTuanHocDto } from './create-tuan-hoc.dto';

export class UpdateTuanHocDto extends PartialType(CreateTuanHocDto) {}
