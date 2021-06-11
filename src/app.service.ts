import { Injectable } from '@nestjs/common';
import { DanhGiaService } from './danh-gia/danh-gia.service';
import { MucTieuService } from './muc-tieu/muc-tieu.service';
import { NguoiDungService } from './nguoi-dung/nguoi-dung.service';
import { ThongBaoService } from './thong-bao/thong-bao.service';
import { TieuChiService } from './tieu-chi/tieu-chi.service';

@Injectable()
export class AppService {
	constructor(
		private ndSer: NguoiDungService,
		private tbSer: ThongBaoService,
	) { }

	async traKetQua(ma: string) {
		const user = await this.ndSer.findOne_byMaND(ma)
		return await user
			.populate({
				path: 'danhGia',
				populate: {
					path: 'tieuChi',
					model: 'tieu_chi',
					populate: {
						path: 'mucTieu',
						model: 'muc_tieu',
					},
				},
			})
			.execPopulate();
	}

	async kiemTra_dangNhap(
		username: string,
		password: string,
	): Promise<{ id: string; ma: string, message: string }> {
		const user = await this.ndSer.findOne_byMaND(username)
		if (!user)
			return {
				id: null,
				ma: null,
				message: 'Không tìm thấy người dùng',
			};
		else {
			if (password === user.matKhau)
				return {
					id: user._id,
					ma: user.maND,
					message: 'Tìm thấy người dùng',
				};
			else
				return {
					id: null,
					ma: null,
					message: 'Sai mật khẩu',
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
