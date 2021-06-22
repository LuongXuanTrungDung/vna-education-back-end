import { Controller, Get, Render } from '@nestjs/common';

@Controller('phu-huynh')
export class PhuHuynhController {
    @Get()
    @Render('phu-huynh')
    async phuHuynh() {
        return '';
    }
}
