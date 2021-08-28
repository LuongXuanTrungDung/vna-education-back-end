import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuenMatKhauDto } from './quen-mat-khau.dto';
import { QuenMatKhauService } from './quen-mat-khau.service';

@Controller('quen-mat-khau')
@ApiTags('quen-mat-khau')
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

    @Get('con-han/:id')
    async kiemTra_conHan(@Param('id') id: string) {
        return await this.service.check_conHan(id);
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
