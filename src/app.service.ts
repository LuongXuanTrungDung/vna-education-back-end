import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ChangePassDTO, SetPassDTO } from './helpers/changePass.dto';
import { contactMailDTO } from './helpers/sendMail.dto';
import { sessionSort, weekdaySort } from './helpers/utilities';
import { BuoiHocService } from './models/buoi-hoc/buoi-hoc.service';
import { DanhGiaService } from './models/danh-gia/danh-gia.service';
import { ThongKeService } from './models/danh-gia/roles/thongKe.service';
import { LienHeService } from './models/lien-he/lien-he.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { NamHocService } from './models/nam-hoc/nam-hoc.service';
import { AccountService } from './models/nguoi-dung/actions/account.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { QuenMatKhauService } from './models/quen-mat-khau/quen-mat-khau.service';
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
        private readonly namSer: NamHocService,
        private readonly dgSer: DanhGiaService,

        private readonly qmkSer: QuenMatKhauService,
        private readonly conSer: LienHeService,

        private readonly mailSer: MailerService,
        private readonly tkSer: ThongKeService,
        private readonly accSer: AccountService,
    ) {}

    async kiemTra_dangNhap(username: string, password: string) {
        const user = await this.accSer.getOne_bymaND(username);
        const pass = await this.accSer.onlyPassword(username);
        if (user && pass) {
            if ((await compare(password, pass)) && user.dangHoatDong)
                return {
                    id: user._id,
                    dangHD: user.dangHoatDong,
                    resOK: true,
                };
            else
                return {
                    id: null,
                    dangHD: user.dangHoatDong,
                    resOK: false,
                };
        } else {
            return {
                id: null,
                dangHD: null,
                resOK: false,
            };
        }
    }

    async thongTin_nguoiDung(user: string) {
        return await this.ndSer.getOne_byID(user);
    }

    async taoLichHoc(tuan: string, lop: string) {
        const week = await this.tuanSer.findOne(tuan);
        const classe = await this.lhSer.findOne(lop);
        const buoi = await this.bhSer.getAll({ tuanHoc: Object(tuan) });
        const tiet = await this.thSer.getAll({ lopHoc: Object(lop) });

        const temp = [];
        const result = { ...week, lopHoc: classe.maLH, buoiHoc: [] };

        for (let i = 0; i < buoi.length; i++) {
            const { tuanHoc, ...b } = buoi[i];
            temp.push({ ...b, tietHoc: [] });
        }

        for (let j = 0; j < temp.length; j++) {
            for (let k = 0; k < tiet.length; k++) {
                if (
                    tiet[k].buoiHoc.thu === temp[j].thu &&
                    tiet[k].buoiHoc.ngayHoc === temp[j].ngayHoc
                ) {
                    const { lopHoc, buoiHoc, ...t } = tiet[k];
                    temp[j].tietHoc.push(t);
                }
            }
        }

        for (let l = temp.length - 1; l >= 0; l--) {
            if (temp[l].tietHoc.length === 0) temp.splice(l, 1);
        }

        for (let m = 0; m < temp.length; m++) {
            temp[m].tietHoc = temp[m].tietHoc.sort((a, b) => {
                return sessionSort(a.thuTiet, b.thuTiet);
            });
        }

        result.buoiHoc = temp;
        result.buoiHoc.sort((a, b) => {
            return weekdaySort(a.thu, b.thu);
        });
        return result;
    }

    async taoLichDay(tuan: string, gv: string) {
        const week = await this.tuanSer.findOne(tuan);
        const buoi = await this.bhSer.getAll({ tuanHoc: Object(tuan) });
        const tiet = await this.thSer.getAll({ giaoVien: Object(gv) });

        const temp = [];
        const result = { ...week, buoiHoc: [] };

        for (let i = 0; i < buoi.length; i++) {
            const { tuanHoc, ...b } = buoi[i];
            temp.push({ ...b, tietHoc: [] });
        }

        for (let j = 0; j < temp.length; j++) {
            for (let k = 0; k < tiet.length; k++) {
                if (
                    tiet[k].buoiHoc.thu === temp[j].thu &&
                    tiet[k].buoiHoc.ngayHoc === temp[j].ngayHoc
                ) {
                    const { giaoVien, buoiHoc, ...t } = tiet[k];
                    temp[j].tietHoc.push(t);
                }
            }
        }

        for (let l = temp.length - 1; l >= 0; l--) {
            if (temp[l].tietHoc.length === 0) temp.splice(l, 1);
        }

        for (let m = 0; m < temp.length; m++) {
            temp[m].tietHoc = temp[m].tietHoc.sort((a, b) => {
                return sessionSort(a.thuTiet, b.thuTiet);
            });
        }

        result.buoiHoc = temp;
        result.buoiHoc.sort((a, b) => {
            return weekdaySort(a.thu, b.thu);
        });

        return result;
    }

    async doiMatKhau(dto: ChangePassDTO) {
        return await this.accSer.changePass(dto);
    }

    async datMoi_matKhau(dto: SetPassDTO) {
        return await this.accSer.setPass(dto);
    }

    async guiMail_quenMatKhau(email: string) {
        const user = await this.accSer.findOne_byEmail(email);
        const toCreate = await this.qmkSer.create({
            emailND: email,
            nguoiDung: user._id,
            conHan: true,
        });

        return this.mailSer
            .sendMail({
                to: email, // Email người nhận
                from: `"VNA Education" - ${process.env.MAIL_USERNAME}`, //Email người gửi
                subject: 'Xác nhận đổi mật khẩu - VNA Education', // Tiêu đề mail
                html: `<a href="${process.env.CLIENT_HOST}/doi-mat-khau/${toCreate._id}.${user._id}">Link vào trang đổi mật khẩu</a>`, // Nội dung mail
            })
            .then(() => {
                return 'Gửi mail thành công';
            })
            .catch((err) => {
                return 'Lỗi ' + err;
            });
    }

    async guiMail_lienHe(dto: contactMailDTO) {
        await this.conSer.create(dto);

        return this.mailSer
            .sendMail({
                from: `"${dto.hoTen}" - ${dto.emailLH}`,
                to: `"VNA Education" - ${process.env.MAIL_USERNAME}`,
                subject: 'Liên hệ - VNA Education',
                html: `${dto.loiNhan} <br/> ${dto.soDienThoai}`,
            })
            .then(() => {
                return 'Gửi mail thành công';
            })
            .catch((err) => {
                return 'Lỗi ' + err;
            });
    }

    async thongKe() {
        const { tuanHoc, ...recentYear } = await this.namSer.getLatest();
        const result = { ...recentYear, tuanHoc: [] };

        for (let i = 0; i < tuanHoc.length; i++) {
            result.tuanHoc.push({
                _id: tuanHoc[i]._id,
                tenTuan: tuanHoc[i].tenTuan,
                soTuan: tuanHoc[i].soTuan,
                thongKe: {
                    tongSo_hocSinh: (await this.ndSer.findAll_byRole('HS'))
                        .length,
                    tongSo_giaoVien: (await this.ndSer.findAll_byRole('GV'))
                        .length,
                    tongSo_danhGia: (
                        await this.dgSer.findAll({
                            tuanDG: Object(tuanHoc[i]._id),
                        })
                    ).length,
                    giaoVien_diemDG: await this.tkSer.getAll_byWeek(
                        tuanHoc[i]._id,
                    ),
                },
            });
        }
        return result;
    }
}
