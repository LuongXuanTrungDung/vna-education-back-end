import { PartialType } from '@nestjs/swagger';
import { CreateBangDiemTongDto } from './create-bang-diem-tong.dto';

export class UpdateBangDiemTongDto extends PartialType(CreateBangDiemTongDto) {
    hanhKiem_hk1: string;
    hocLuc_hk1: string;
    hanhKiem_hk2: string;
    hocLuc_hk2: string;
}
