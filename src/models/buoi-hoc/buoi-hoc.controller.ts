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
import { BuoiHocService } from './buoi-hoc.service';
import { AuthGuard } from '../../auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { BuoiHocDto } from './buoi-hoc.dto';

@Controller('buoi-hoc')
@ApiTags('buoi-hoc')
@UseGuards(AuthGuard)
export class BuoiHocController {
    constructor(private readonly service: BuoiHocService) {}

    @Post()
    async create(@Body() dto: BuoiHocDto) {
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
    async update(@Param('id') id: string, @Body() dto: BuoiHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
