import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose'
import { DanhGiaService } from './danh-gia/danh-gia.service';
import { MucTieuService } from './muc-tieu/muc-tieu.service';
import { NgayHocService } from './ngay-hoc/ngay-hoc.service';
import { NguoiDungService } from './nguoi-dung/nguoi-dung.service';
import { ThongBaoService } from './thong-bao/thong-bao.service';
import { TieuChiService } from './tieu-chi/tieu-chi.service';

@Injectable()
export class AppService {
	constructor(
		private ndSer: NguoiDungService,
		private tbSer: ThongBaoService,
		private ngaySer: NgayHocService,
	) { }

	async traDanhGia_theoNguoiDung_theoNgay(ma: string, ngay: string) {
		const result = [];
		const days = await (await this.ngaySer.findOne(ngay))
			.populate({
				path: 'danhGia',
				model: 'danh_gia',
				populate: [
					{
						path: 'nguoiDG',
						model: 'nguoi_dung'
					},
					{
						path: 'tieuChi',
						model: 'tieu_chi',
						populate: {
							path: 'mucTieu',
							model: 'muc_tieu'
						}
					}
				]
			})
			.execPopulate();

		for (let i = 0; i < days.danhGia.length; i++) {
			if (days.danhGia[i].nguoiDG.maND === ma) result.push(days.danhGia[i])
		}
		return result
	}

	async kiemTra_dangNhap(username: string, password: string) {
		const user = await this.ndSer.findOne_byMaND(username);
		if (!user)
			return {
				id: null,
				resOK: false,
			};
		else {
			if (password === user.matKhau)
				return {
					id: user._id,
					resOK: true,
				};
			else
				return {
					id: null,
					resOK: false,
				};
		}
	}

	async traThongBao() {
		const k1 = await this.tbSer.findByType('Thông báo chung');
		const k2 = await this.tbSer.findByType('Thời khóa biểu');
		const k3 = await this.tbSer.findByType('Học phí');
		return {
			chung: k1,
			hocTap: k2,
			hocPhi: k3,
		};
	}

	// async traNgay_trongTuan(tuan: string) {
	//     const days = await this.nHSer.findbyWeek(tuan);
	//     const result = [];
	//     const thu = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

	//     if (days) {
	//         for (let i = 0; i < days.length; i++) {
	//             const temp = days[i].ngayCuThe;
	//             const dow = thu[temp.getDay()];
	//             const month = temp.getUTCMonth() + 1;
	//             const day = temp.getUTCDate();
	//             const r = dow + '-' + String(day) + '/' + String(month);
	//             result.push(r);
	//         }
	//     }
	//     return result;
	// }

	// async traTietHoc(tiet: number) {
	//     const;
	// }
}
