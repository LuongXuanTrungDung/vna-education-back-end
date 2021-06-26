import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';

@Controller('phu-huynh')
@UseGuards(AuthGuard)
@ApiTags('phu-huynh')
export class PhuHuynhController {
    @Get()
    @Render('phu-huynh')
    async phuHuynh() {
        return '';
    }
}
