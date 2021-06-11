import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MonHocService } from './mon-hoc.service';
import { CreateMonHocDto } from './dto/create-mon-hoc.dto';
import { UpdateMonHocDto } from './dto/update-mon-hoc.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('mon-hoc')
@ApiTags('mon-hoc')
export class MonHocController {
    constructor(private readonly monHocService: MonHocService) {}

    @Post()
	@ApiCreatedResponse({ description: 'Tạo thành công' })
    create(@Body() createMonHocDto: CreateMonHocDto) {
        return this.monHocService.create(createMonHocDto);
    }

    @Get()
	@ApiOkResponse({ description: 'Trả về tất cả' })
    findAll() {
        return this.monHocService.findAll();
    }

    @Get(':id')
	@ApiOkResponse({ description: 'Trả về 1 đối tượng' })
    findOne(@Param('id') id: string) {
        return this.monHocService.findOne(+id);
    }

    @Patch(':id')
	@ApiOkResponse({ description: 'Cập nhật thành công' })
    update(@Param('id') id: string, @Body() updateMonHocDto: UpdateMonHocDto) {
        return this.monHocService.update(+id, updateMonHocDto);
    }

    @Delete(':id')
	@ApiOkResponse({ description: 'Xóa thành công' })
    remove(@Param('id') id: string) {
        return this.monHocService.remove(+id);
    }
}
