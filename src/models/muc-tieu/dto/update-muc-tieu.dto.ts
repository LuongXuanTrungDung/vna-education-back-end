import { PartialType } from '@nestjs/swagger';
import { CreateMucTieuDto } from './create-muc-tieu.dto';

export class UpdateMucTieuDto extends PartialType(CreateMucTieuDto) {}
