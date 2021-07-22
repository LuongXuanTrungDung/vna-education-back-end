import { ImportNguoiDungDto } from './import-nguoi-dung.dto';

export class ImportNhanSuDTO extends ImportNguoiDungDto {
    chucVu: string[];
    hopDong: string[];
    tDCM: string[];
}
