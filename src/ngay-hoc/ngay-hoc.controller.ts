import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateNgayHocDto } from './dto/create-ngay-hoc.dto';
import { UpdateNgayHocDto } from './dto/update-ngay-hoc.dto';
import { NgayHocService } from './ngay-hoc.service';

@Controller('ngay-hoc')
export class NgayHocController {
    constructor(private readonly service: NgayHocService) {}

    @Post()
    async create(@Body() dto: CreateNgayHocDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateNgayHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
