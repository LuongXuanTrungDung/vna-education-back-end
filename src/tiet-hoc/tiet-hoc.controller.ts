import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateTietHocDto } from './dto/create-tiet-hoc.dto';
import { UpdateTietHocDto } from './dto/update-tiet-hoc.dto';
import { TietHocService } from './tiet-hoc.service';

@Controller('tiet-hoc')
export class TietHocController {
    constructor(private readonly service: TietHocService) {}

    @Post()
    async create(@Body() dto: CreateTietHocDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateTietHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
