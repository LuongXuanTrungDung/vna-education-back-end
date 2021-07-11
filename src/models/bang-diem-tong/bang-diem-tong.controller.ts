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
import { AuthGuard } from '../../auth.guard';
import { BangDiemTongService } from './bang-diem-tong.service';
import { CreateBangDiemTongDto } from './dto/create-bang-diem-tong.dto';
import { UpdateBangDiemTongDto } from './dto/update-bang-diem-tong.dto';

@Controller('bang-diem-tong')
@UseGuards(AuthGuard)
export class BangDiemTongController {
    constructor(private readonly service: BangDiemTongService) {}

    @Post()
    async create(@Body() dto: CreateBangDiemTongDto) {
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
    async update(@Param('id') id: string, @Body() dto: UpdateBangDiemTongDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
