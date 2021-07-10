import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { BangDiemMonService } from './bang-diem-mon.service';
import { CreateBangDiemMonDto } from './dto/create-bang-diem-mon.dto';
import { UpdateBangDiemMonDto } from './dto/update-bang-diem-mon.dto';

@Controller('bang-diem-mon')
export class BangDiemMonController {
    constructor(private readonly service: BangDiemMonService) {}

    @Post()
    async create(@Body() dto: CreateBangDiemMonDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateBangDiemMonDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
