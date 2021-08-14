import { IsEmail } from 'class-validator';

export class sendMailDTO {
    @IsEmail() receiver: string;
    token: string;
}
