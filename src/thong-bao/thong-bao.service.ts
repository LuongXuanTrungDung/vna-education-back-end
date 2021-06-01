import { Injectable } from '@nestjs/common';
import { CreateThongBaoDto } from './dto/create-thong-bao.dto';
import { UpdateThongBaoDto } from './dto/update-thong-bao.dto';

@Injectable()
export class ThongBaoService {
  create(dto: CreateThongBaoDto) {
    return 'This action adds a new thongBao';
  }

  findAll() {
    return `This action returns all thongBao`;
  }

  findOne(id: string) {
    return `This action returns a #${id} thongBao`;
  }

  update(id: string, updateThongBaoDto: UpdateThongBaoDto) {
    return `This action updates a #${id} thongBao`;
  }

  remove(id: string) {
    return `This action removes a #${id} thongBao`;
  }
}
