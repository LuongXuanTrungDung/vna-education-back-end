import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth.guard';
import { BangDiemTongDto } from './bang-diem-tong.dto';
import { BangDiemTongService } from './bang-diem-tong.service';

@Controller('bang-diem-tong')
@UseGuards(AuthGuard)
export class BangDiemTongController {
    constructor(private readonly service: BangDiemTongService) {}

    @Post()
    async create(@Body() dto: BangDiemTongDto) {
        return await this.service.create(dto);
    }

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: BangDiemTongDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
