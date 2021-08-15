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
import { NamHocService } from './nam-hoc.service';
import { AuthGuard } from '../../auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { NamHocDto } from './nam-hoc.dto';

@Controller('nam-hoc')
@ApiTags('nam-hoc')
@UseGuards(AuthGuard)
export class NamHocController {
    constructor(private readonly service: NamHocService) {}

    @Post()
    async create(@Body() dto: NamHocDto) {
        return await this.service.create(dto);
    }

    @Get()
    async findAll() {
        return await this.service.getAll();
    }

    @Get('gan-nhat')
    async findLatest() {
        return await this.service.getLatest();
    }

    @Get('gan-nhat/tuan-gan-nhat')
    async findLatestWeek() {
        return await this.service.getLatest_latestWeek();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.service.getOne(id);
    }

    @Patch(':id/them-tuan')
    async addWeek(@Param('id') id: string, @Body() weeks: string[]) {
        return await this.service.addWeeks(id, weeks);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: NamHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
