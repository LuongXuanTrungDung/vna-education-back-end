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
import { MonHocService } from './mon-hoc.service';
import { CreateMonHocDto } from './dto/create-mon-hoc.dto';
import { UpdateMonHocDto } from './dto/update-mon-hoc.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';

@Controller('mon-hoc')
@UseGuards(AuthGuard)
@ApiTags('mon-hoc')
export class MonHocController {
    constructor(private readonly service: MonHocService) {}

    @Post()
    @ApiBody({ type: CreateMonHocDto })
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async create(@Body() dto: CreateMonHocDto) {
        return await this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiParam({
        type: String,
        name: 'id',
        description: '_id của môn học',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({
        type: String,
        name: 'id',
        description: '_id của môn học',
    })
    @ApiBody({ type: UpdateMonHocDto })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async update(@Param('id') id: string, @Body() dto: UpdateMonHocDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        type: String,
        name: 'id',
        description: '_id của môn học',
    })
    @ApiOkResponse({ description: 'Xóa thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
