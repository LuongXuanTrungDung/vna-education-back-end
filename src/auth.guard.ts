import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly ndSer: NguoiDungService) {}

    async canActivate(context: ExecutionContext) {
        const token = context
            .switchToHttp()
            .getRequest()
            .header('Authorization');
        if (!token || token == '') return false;

        if (await this.ndSer.findOne_byID(token)) return true;
        else return false;
    }
}
