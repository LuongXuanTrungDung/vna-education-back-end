import { Headers, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
	use(@Headers('Authorization') headers: string, res: Response, next: NextFunction) {
		const token = headers && headers.split(' ')[1]
		if (!token || token == '') return res.status(401).send('Không có quyền truy cập')
		else {

		}
		next()
	}
}

