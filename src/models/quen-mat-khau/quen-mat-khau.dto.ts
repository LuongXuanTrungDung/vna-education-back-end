import { IsEmail } from 'class-validator';

export class QuenMatKhauDto {
    @IsEmail() emailND: string;
    nguoiDung: string;
    conHan = true;
}
