import { PartialType } from '@nestjs/swagger';
import { CreateBangDiemMonDto } from './create-bang-diem-mon.dto';

export class UpdateBangDiemMonDto extends PartialType(CreateBangDiemMonDto) {}
