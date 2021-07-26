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
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { BangDiemMonDto } from './bang-diem-mon.dto';
import { BangDiemMonService } from './bang-diem-mon.service';

@Controller('bang-diem-mon')
@ApiTags('bang-diem-mon')
@UseGuards(AuthGuard)
export class BangDiemMonController {
    constructor(private readonly service: BangDiemMonService) {}

    @Post()
    async create(@Body() dto: BangDiemMonDto) {
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
    async update(@Param('id') id: string, @Body() dto: BangDiemMonDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
