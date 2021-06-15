import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { HocKyService } from './hoc-ky.service';
import { CreateHocKyDto } from './dto/create-hoc-ky.dto';
import { UpdateHocKyDto } from './dto/update-hoc-ky.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('hoc-ky')
@ApiTags('hoc-ky')
export class HocKyController {
    constructor(private readonly hocKyService: HocKyService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Tạo thành công' })
    create(@Body() createHocKyDto: CreateHocKyDto) {
        return this.hocKyService.create(createHocKyDto);
    }

    @Get()
    @ApiOkResponse({ description: 'Trả về tất cả' })
    findAll() {
        return this.hocKyService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    findOne(@Param('id') id: string) {
        return this.hocKyService.findOne(+id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Cập nhật thành công' })
    update(@Param('id') id: string, @Body() updateHocKyDto: UpdateHocKyDto) {
        return this.hocKyService.update(+id, updateHocKyDto);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Xóa thành công' })
    remove(@Param('id') id: string) {
        return this.hocKyService.remove(+id);
    }
}
