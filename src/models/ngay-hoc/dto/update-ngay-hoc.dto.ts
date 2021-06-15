import { PartialType } from '@nestjs/swagger';
import { CreateNgayHocDto } from './create-ngay-hoc.dto';

export class UpdateNgayHocDto extends PartialType(CreateNgayHocDto) {}
