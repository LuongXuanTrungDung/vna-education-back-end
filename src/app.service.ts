import { Injectable } from '@nestjs/common';
import { DanhGiaService } from './danh-gia/danh-gia.service';
import { MucTieuService } from './muc-tieu/muc-tieu.service';
import { NguoiDungService } from './nguoi-dung/nguoi-dung.service';
import { ThongBaoService } from './thong-bao/thong-bao.service';
import { TieuChiService } from './tieu-chi/tieu-chi.service';

@Injectable()
export class AppService {
    constructor(
        private dgSer: DanhGiaService,
        private tcSer: TieuChiService,
        private mtSer: MucTieuService,
        private ndSer: NguoiDungService,
        private tbSer: ThongBaoService,
    ) {}

    async traDanhGia_theoNguoiDung(userID: string) {
        let result = [];
        const ques = [];
        let dets = [];
        const reviews = await this.dgSer.theoNguoiDung(userID);

        if (reviews) {
            for (let i = 0; i < reviews.length; i++) {
                const cates = reviews[i].tieuChi;

                for (let j = 0; j < cates.length; j++) {
                    const temp = await this.tcSer.findOne(cates[j]);
                    if (temp) ques.push(temp);
                    const tars = ques[j].mucTieu;

                    for (let k = 0; k < tars.length; k++) {
                        const mts = await this.mtSer.findOne(tars[k]);
                        if (mts) dets.push(mts);
                    }
                    ques[j].mucTieu = dets;
                    dets = [];
                }
                reviews[i].tieuChi = ques;
            }

            result = reviews;
        }
        return result;
    }

    async kiemTra_dangNhap(username: string, password: string) {
        const user = await this.ndSer.findOne(username);
        if (!user) return 'Không tìm thấy người dùng';
        else {
            if (password === user.matKhau) return user;
            else return 'Sai mật khẩu';
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
}
