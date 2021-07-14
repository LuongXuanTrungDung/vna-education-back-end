import { PartialType } from '@nestjs/swagger';
import { CreateBangDiemTongDto } from './create-bang-diem-tong.dto';

export class UpdateBangDiemTongDto extends PartialType(CreateBangDiemTongDto) {}
