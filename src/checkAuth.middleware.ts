import { forwardRef, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
    constructor(
        @Inject(forwardRef(() => NguoiDungService))
        private ndSer: NguoiDungService,
    ) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization');
        if (!token || token == '') 
			return res.status(401).send('Không tìm thấy người dùng');
		
        if (this.ndSer.findOne_byID(token)) {
            return res.status(200).send('Người dùng tồn tại');
        }

next()
    }
}
