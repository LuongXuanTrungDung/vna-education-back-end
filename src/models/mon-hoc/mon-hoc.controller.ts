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
    create(@Body() dto: CreateMonHocDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiParam({
        type: String,
        name: 'id',
        description: '_id của môn học',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({
        type: String,
        name: 'id',
        description: '_id của môn học',
    })
    @ApiBody({ type: UpdateMonHocDto })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    update(@Param('id') id: string, @Body() dto: UpdateMonHocDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        type: String,
        name: 'id',
        description: '_id của môn học',
    })
    @ApiOkResponse({ description: 'Xóa thành công' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
