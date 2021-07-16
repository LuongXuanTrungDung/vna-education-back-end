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
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import {
    ApiBody,
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
    @ApiBody({ type: CreateNguoiDungDto })
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    async create(@Body() dto: CreateNguoiDungDto) {
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
    @ApiBody({
        type: UpdateNguoiDungDto,
    })
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    async update(@Param('id') id: string, @Body() dto: UpdateNguoiDungDto) {
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
