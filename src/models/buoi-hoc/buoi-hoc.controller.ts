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
import { CreateBuoiHocDto } from './dto/create-buoi-hoc.dto';
import { AuthGuard } from '../../auth.guard';
import { UpdateBuoiHocDto } from './dto/update-buoi-hoc.dto';

@Controller('buoi-hoc')
@UseGuards(AuthGuard)
export class BuoiHocController {
    constructor(private readonly service: BuoiHocService) {}

    @Post()
    async create(@Body() dto: CreateBuoiHocDto) {
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

    @Patch(':id/them-tiet')
    async addClass(@Param('id') id: string, @Body() classe: string[]) {
        return await this.service.addClass(id, classe);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateBuoiHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
