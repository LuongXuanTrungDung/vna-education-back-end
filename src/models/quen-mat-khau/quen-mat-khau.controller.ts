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
import { QuenMatKhauDto } from './quen-mat-khau.dto';
import { QuenMatKhauService } from './quen-mat-khau.service';

@Controller('quen-mat-khau')
@ApiTags('quen-mat-khau')
@UseGuards(AuthGuard)
export class QuenMatKhauController {
    constructor(private readonly service: QuenMatKhauService) {}

    @Post()
    async create(@Body() dto: QuenMatKhauDto) {
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
    async update(@Param('id') id: string, @Body() dto: QuenMatKhauDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
