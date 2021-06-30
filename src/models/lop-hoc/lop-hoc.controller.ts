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
import { CreateLopHocDto } from './dto/create-lop-hoc.dto';
import { UpdateLopHocDto } from './dto/update-lop-hoc.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';

@Controller('lop-hoc')
@UseGuards(AuthGuard)
@ApiTags('lop-hoc')
export class LopHocController {
    constructor(private readonly service: LopHocService) {}

    @Post()
	@ApiBody({type: CreateLopHocDto})
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateLopHocDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả', isArray: true, type: 'array' })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
	@ApiParam({name: 'id', type: String, description: 'Mã lớp học'})
	@ApiBody({type: UpdateLopHocDto})
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: UpdateLopHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
	@ApiParam({name: 'id', type: String, description: 'Mã lớp học'})
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
