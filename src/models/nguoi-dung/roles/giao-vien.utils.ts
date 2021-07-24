import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NguoiDungDocument } from '../nguoi-dung.entity';
import { NguoiDungService } from '../nguoi-dung.service';

@Injectable()
export class GiaoVienUtils {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async forSelect_giaoVien() {
        const result = [];
        const gv = await this.ndSer.findAll_byRole('GV');
        for (let i = 0; i < gv.length; i++) {
            result.push({
                id: gv[i]._id,
                ten: gv[i].hoTen,
            });
        }
        return result;
    }
}
