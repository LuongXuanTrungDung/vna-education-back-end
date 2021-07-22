import { ImportNguoiDungDto } from './import-nguoi-dung.dto';

export class ImportGVDTO extends ImportNguoiDungDto {
    chucVu: string[];
    hopDong: string[];
    tDCM: string[];
    chuNhiem: string[];
}
