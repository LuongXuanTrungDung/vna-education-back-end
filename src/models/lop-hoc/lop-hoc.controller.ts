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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { LopHocDto } from './lop-hoc.dto';
import { LopHocResponse } from './lop-hoc.res';

@Controller('lop-hoc')
@UseGuards(AuthGuard)
@ApiTags('lop-hoc')
export class LopHocController {
    constructor(private readonly service: LopHocService) {}

    @Post()
    @ApiBody({ type: LopHocDto })
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiInternalServerErrorResponse({
        description: 'Lỗi hệ thống',
    })
    async create(@Body() dto: LopHocDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Trả về tất cả',
        type: [LopHocResponse],
    })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiInternalServerErrorResponse({
        description: 'Lỗi hệ thống',
    })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String, description: 'Mã lớp học' })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng', type: LopHocResponse })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiInternalServerErrorResponse({
        description: 'Lỗi hệ thống',
    })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: String, description: 'Mã lớp học' })
    @ApiBody({ type: LopHocDto })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiInternalServerErrorResponse({
        description: 'Lỗi hệ thống',
    })
    async update(@Param('id') id: string, @Body() dto: LopHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, description: 'Mã lớp học' })
    @ApiOkResponse({ description: 'Xóa thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiInternalServerErrorResponse({
        description: 'Lỗi hệ thống',
    })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
