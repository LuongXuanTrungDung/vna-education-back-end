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
import { LopHocService } from './lop-hoc.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { LopHocDto } from './lop-hoc.dto';

@Controller('lop-hoc')
@UseGuards(AuthGuard)
@ApiTags('lop-hoc')
export class LopHocController {
    constructor(private readonly service: LopHocService) {}

    @Post()
    async create(@Body() dto: LopHocDto) {
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
    async update(@Param('id') id: string, @Body() dto: LopHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
