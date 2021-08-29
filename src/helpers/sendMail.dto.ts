import { IsEmail } from 'class-validator';

export class sendMailDTO {
    @IsEmail() receiver: string;
}

export class contactMailDTO {
    hoTen: string;
    emailLH: string;
    soDienThoai: string;
    loiNhan: string;
}
