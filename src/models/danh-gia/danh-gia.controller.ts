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
    constructor(private readonly service: DanhGiaService) {}

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
        return await this.service.create(dto);
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
        return await this.service.findAll();
    }

    @Get('chua-lam')
    async findAll_notDone(@Query('hs') hs: string, @Query('tuan') tuan: string) {
        return await this.service.findUnfinished(hs, tuan);
    }

    @Get('theo')
    async findAllBy(@Query('mon') mon: string) {
        if (mon && mon != '') return await this.service.findAll_bySubject(mon);
        return await this.service.findAll();
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
        return await this.service.findOne(id);
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
        return await this.service.update(id, dto);
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
        return await this.service.remove(id);
    }
}
