import { Injectable } from '@nestjs/common';
import { CreateHocKyDto } from './dto/create-hoc-ky.dto';
import { UpdateHocKyDto } from './dto/update-hoc-ky.dto';

@Injectable()
export class HocKyService {
    create(createHocKyDto: CreateHocKyDto) {
        return 'This action adds a new hocKy';
    }

    findAll() {
        return `This action returns all hocKy`;
    }

    findOne(id: number) {
        return `This action returns a #${id} hocKy`;
    }

    update(id: number, updateHocKyDto: UpdateHocKyDto) {
        return `This action updates a #${id} hocKy`;
    }

    remove(id: number) {
        return `This action removes a #${id} hocKy`;
    }
}
