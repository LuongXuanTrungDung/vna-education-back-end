import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NguoiDungDocument } from '../nguoi-dung.entity';
import { NguoiDungService } from '../nguoi-dung.service';

@Injectable()
export class HocSinhUtils {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async forSelect_hocSinh() {
        const result = [];
        const hs = await this.ndSer.findAll_byRole('HS');
        for (let i = 0; i < hs.length; i++) {
            result.push({
                id: hs[i]._id,
                ten: hs[i].hoTen,
            });
        }
        return result;
    }
}
