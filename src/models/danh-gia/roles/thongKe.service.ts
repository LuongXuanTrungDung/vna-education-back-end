import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { average, removeDuplicates } from '../../../helpers/utilities';
import { DanhGiaDocument } from '../danh-gia.entity';

@Injectable()
export class ThongKeService {
    constructor(
        @InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
    ) {}

    async lowestScore_perWeek(week: string) {
        const all = await this.model
            .find({ tuanDG: Object(week) })
            .populate({ path: 'giaoVien', select: 'hoTen' })
            .exec();
        const toSort = removeDuplicates(all, 'giaoVien').map((val) => {
            return {
                giaoVien: val.giaoVien,
                diemTong: 0,
            };
        });

        for (let i = 0; i < toSort.length; i++) {
            const toCount = [];

            for (let j = 0; j < all.length; j++) {
                if (all[j].giaoVien === toSort[i].giaoVien) {
                    if (all[j].chiTiet.length > 0) {
                        let temp = 0;
                        for (let k = 0; k < all[j].chiTiet.length; k++) {
                            temp += all[j].chiTiet[k].diemDG;
                        }
                        toCount.push(temp / all[j].chiTiet.length);
                    } else toCount.push(0);
                }
            }

            toSort[i].diemTong = average(toCount);
        }
        return toSort;
    }
}
