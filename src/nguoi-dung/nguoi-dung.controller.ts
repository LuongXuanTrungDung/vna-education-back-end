import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('nguoi-dung')
@ApiTags('nguoi-dung')
export class NguoiDungController {
    constructor(private readonly service: NguoiDungService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateNguoiDungDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll() {
        return await this.service.findAll();
    }

    @Get('ma/:id')
    @ApiOkResponse({ description: 'Trả về 1 đối tượng từ maND' })
    async findOne_byMaND(@Param('id') ma: string) {
        return await this.service.findOne_byMaND(ma);
    }

	@Get('id/:id')
    @ApiOkResponse({ description: 'Trả về 1 đối tượng từ _id' })
    async findOne_byID(@Param('id') id: string) {
        return await this.service.findOne_byID(id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: UpdateNguoiDungDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
