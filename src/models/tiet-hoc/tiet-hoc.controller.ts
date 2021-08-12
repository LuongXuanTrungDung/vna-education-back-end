import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { CreateTietHocDto } from './dto/create-tiet-hoc.dto';
import { UpdateTietHocDto } from './dto/update-tiet-hoc.dto';
import { TietHocService } from './tiet-hoc.service';

@Controller('tiet-hoc')
@UseGuards(AuthGuard)
@ApiTags('tiet-hoc')
export class TietHocController {
    constructor(private readonly service: TietHocService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateTietHocDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll() {
        return await this.service.findAll();
    }

    @Get('theo')
    async findBY(
        @Query('buoi') buoi: string,
        @Query('gv') gv: string,
        @Query('mon') mon: string,
    ) {
        if (buoi && buoi != '') return await this.service.findAll_byDate(buoi);
        if (gv && gv != '' && mon && mon != '')
            return await this.service.findAll_byGVbySub(gv, mon);
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: UpdateTietHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
