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
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungDto } from './nguoi-dung.dto';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { RoleType } from '../../helpers/utilities';

@Controller('nguoi-dung')
@UseGuards(AuthGuard)
@ApiTags('nguoi-dung')
export class NguoiDungController {
    constructor(private readonly service: NguoiDungService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: NguoiDungDto) {
        return await this.service.create(dto);
    }

    @Get('theo')
    @ApiQuery({
        name: 'role',
        type: String,
        description: 'Vai trò của người dùng, 2 chữ cái đầu của maND',
    })
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll_according(@Query('role') role: string) {
        if (role && role != '')
            return this.service.findAll_byRole(<RoleType>role);

        return await this.service.findAll();
    }

    @Post('import')
    async import(@Body() dto: NguoiDungDto[]) {
        return await this.service.bulkCreate(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của người dùng',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng từ _id' })
    async findOne_byID(@Param('id') id: string) {
        return await this.service.findOne_byID(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của người dùng',
    })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: NguoiDungDto) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của người dùng',
    })
    @ApiOkResponse({ description: 'Xóa thành công' })
    async remove(@Param('id') id: string) {
        return await this.service.remove(id);
    }
}
