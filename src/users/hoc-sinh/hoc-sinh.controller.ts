import { Controller, Get, Render } from '@nestjs/common';

@Controller('hoc-sinh')
export class HocSinhController {
    @Get()
    @Render('hoc-sinh')
    async hocSinh() {
        return '';
    }
}
