import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly ndSer: NguoiDungService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const token = context
            .switchToHttp()
            .getRequest()
            .header('Authorization');
        if (!token || token == '') return false;

        if (this.ndSer.findOne_byID(token)) return true;
        else return false;
    }
}
