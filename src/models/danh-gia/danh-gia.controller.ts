import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AuthGuard } from '../../auth.guard';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { DanhGia, DanhGiaSchema } from './danh-gia.entity';
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
    async create(@Body() dto: CreateDanhGiaDto) {
        return await this.dgSer.create(dto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Trả về tất cả',
        isArray: true,
    })
    async findAll() {
        return await this.dgSer.findAll();
    }

    @Get('theo')
    @ApiQuery({
        name: 'user',
        type: String,
        description: '_id của người đánh giá',
    })
    @ApiQuery({
        name: 'ngay',
        type: String,
        description: 'Ngày đánh giá',
    })
    @ApiOkResponse({
        description: 'Trả về tất cả đánh giá theo _id của người dùng',
        isArray: true,
    })
    async findAll_According(
        @Query('user') user?: string,
        @Query('ngay') ngay?: string,
    ) {
        if (user && user != '') {
            const classe = (await this.ndSer.findOne_byID(user)).lopHoc;
            return await this.dgSer.findAll_byUser(classe);
        }

        if (ngay && ngay != '') return await this.dgSer.findAll_byDate(ngay);

        return null;
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        description: '_id của đánh giá',
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
    @ApiOkResponse({ description: 'Xóa thành công', isArray: false })
    async remove(@Param('id') id: string) {
        return await this.dgSer.remove(id);
    }
}
