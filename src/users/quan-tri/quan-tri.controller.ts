import { Controller, Get, Render } from '@nestjs/common';

@Controller('quan-tri')
export class QuanTriController {
    @Get()
    @Render('quan-tri')
    async quanTri() {
        return '';
    }
}
