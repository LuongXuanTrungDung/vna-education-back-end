import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { removeDuplicates, weekdaySort } from './helpers/utilities';
import { BuoiHocService } from './models/buoi-hoc/buoi-hoc.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { TietHocService } from './models/tiet-hoc/tiet-hoc.service';
import { TuanHocService } from './models/tuan-hoc/tuan-hoc.service';

@Injectable()
export class AppService {
    constructor(
        private readonly ndSer: NguoiDungService,
        private readonly lhSer: LopHocService,
        private readonly tuanSer: TuanHocService,
        private readonly bhSer: BuoiHocService,
        private readonly thSer: TietHocService,
    ) {}

    async kiemTra_dangNhap(username: string, password: string) {
        const user = await this.ndSer.findOne_byMaND(username);
        const pass = await this.ndSer.onlyPassword(username);
        if (user && pass) {
            if (await compare(password, pass))
                return {
                    id: user.id,
                    resOK: true,
                };
            else
                return {
                    id: null,
                    resOK: false,
                };
        } else {
            return {
                id: null,
                resOK: false,
            };
        }
    }

	async thongTin_nguoiDung(user: string) {
		return await this.ndSer.getOne_byID(user)
	}

    async taoLichHoc(tuan: string, lop: string) {
        const week = await this.tuanSer.findOne(tuan);
        const classe = await this.lhSer.findOne(lop);
        const tiet = await this.thSer.getAll();
        const t1 = [];
        const result = { ...week, lopHoc: classe.maLH, buoiHoc: [] };

        for (let i = 0; i < tiet.length; i++) {
            if (tiet[i].buoiHoc.tuanHoc === week.soTuan) {
                const { tuanHoc, ...b } = tiet[i].buoiHoc;
                t1.push({ ...b, tietHoc: [] });
            }
        }
        const t2 = removeDuplicates(t1, '_id');

        for (let j = 0; j < t2.length; j++) {
            for (let k = 0; k < tiet.length; k++) {
                if (tiet[k].lopHoc === classe.maLH) {
                    const { lopHoc, buoiHoc, ...t } = tiet[k];
                    t2[j].tietHoc.push(t);
                }
            }
            t2[j].tietHoc = removeDuplicates(t2[j].tietHoc, 'thuTiet');
        }

        result.buoiHoc = t2;
        result.buoiHoc.sort((a, b) => {
            return weekdaySort(a.thu, b.thu);
        });
        return result;
    }
}
