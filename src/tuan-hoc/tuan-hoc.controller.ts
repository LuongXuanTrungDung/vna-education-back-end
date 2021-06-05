import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TuanHocService } from './tuan-hoc.service';
import { CreateTuanHocDto } from './dto/create-tuan-hoc.dto';
import { UpdateTuanHocDto } from './dto/update-tuan-hoc.dto';

@Controller('tuan-hoc')
export class TuanHocController {
    constructor(private readonly service: TuanHocService) {}

    @Post()
    async create(@Body() dto: CreateTuanHocDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateTuanHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
