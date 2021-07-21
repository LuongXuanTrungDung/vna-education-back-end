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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth.guard';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { DanhGiaService } from './danh-gia.service';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Controller('danh-gia')
@UseGuards(AuthGuard)
@ApiTags('danh-gia')
@ApiExtraModels(CreateDanhGiaDto, UpdateDanhGiaDto)
export class DanhGiaController {
    constructor(
        private readonly dgSer: DanhGiaService,
        private ndSer: NguoiDungService,
    ) {}

    @Post()
    @ApiBody({
        type: CreateDanhGiaDto,
        description: 'DTO chứa dữ liệu để tạo 1 đánh giá mới',
    })
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async create(@Body() dto: CreateDanhGiaDto) {
        return await this.dgSer.create(dto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Trả về tất cả',
        isArray: true,
    })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    async findAll() {
        return await this.dgSer.findAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của đánh giá',
    })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiOkResponse({ description: 'Trả về 1 đối tượng', isArray: false })
    async findOne(@Param('id') id: string) {
        return await this.dgSer.findOne(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của đánh giá',
    })
    @ApiBody({
        description: 'DTO chứa dữ liệu để cập nhật đánh giá',
        isArray: false,
        type: UpdateDanhGiaDto,
    })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiOkResponse({ description: 'Cập nhật thành công', isArray: false })
    async update(@Param('id') id: string, @Body() dto: UpdateDanhGiaDto) {
        return await this.dgSer.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của đánh giá',
    })
    @ApiForbiddenResponse({
        description: 'Ngăn cản truy cập do chưa đăng nhập vào hệ thống',
    })
    @ApiOkResponse({ description: 'Xóa thành công', isArray: false })
    async remove(@Param('id') id: string) {
        return await this.dgSer.remove(id);
    }
}
