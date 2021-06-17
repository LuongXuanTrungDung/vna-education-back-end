import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { BangDiemService } from './models/bang-diem/bang-diem.service';
import { DanhGiaService } from './models/danh-gia/danh-gia.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { MonHocService } from './models/mon-hoc/mon-hoc.service';
import { MucTieuService } from './models/muc-tieu/muc-tieu.service';
import { NgayHocService } from './models/ngay-hoc/ngay-hoc.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { ThongBaoService } from './models/thong-bao/thong-bao.service';
import { TieuChiService } from './models/tieu-chi/tieu-chi.service';

@Injectable()
export class AppService {
    constructor(
        private ndSer: NguoiDungService,
        private dgSer: DanhGiaService,
        private tbSer: ThongBaoService,
        private ngaySer: NgayHocService,
        private mhSer: MonHocService,
        private lhSer: LopHocService,
        private bdSer: BangDiemService,
    ) {}

    async traMonHoc_vaGiaoVien() {
        const result = [];
        const subjects = await this.mhSer.findAll();

        for (let i = 0; i < subjects.length; i++) {
            const s = await subjects[i]
                .populate({
                    path: 'giaoVien',
                    model: 'nguoi_dung',
                })
                .execPopulate();
            result.push(s);
        }
        return result;
    }

    async traLopHoc_HSvaGV() {
        const result = [];
        const classes = await this.lhSer.findAll();

        for (let i = 0; i < classes.length; i++) {
            const c = await classes[i]
                .populate([
                    {
                        path: 'hocSinh',
                        model: 'nguoi_dung',
                    },
                    {
                        path: 'GVCN',
                        model: 'nguoi_dung',
                    },
                ])
                .execPopulate();
            result.push(c);
        }
        return result;
    }

    async traBangDiem_theoHS(hs: string) {
        const result = [];
        const scores = await this.bdSer.findAll();

        for (let i = 0; i < scores.length; i++) {
            const d = await scores[i]
                .populate({
                    path: 'hocSinh',
                    model: 'nguoi_dung',
                })
                .execPopulate();
            if (d.hocSinh.maND === hs) result.push(d);
        }
        return result;
    }

    async traDanhGia_theoNguoiDung_theoNgay(ma: string, ngay: string) {
        const result = [];
        const days = await (
            await this.ngaySer.findOne(ngay)
        )
            .populate({
                path: 'danhGia',
                model: 'danh_gia',
                populate: [
                    {
                        path: 'nguoiDG',
                        model: 'nguoi_dung',
                    },
                    {
                        path: 'tieuChi',
                        model: 'tieu_chi',
                        populate: {
                            path: 'mucTieu',
                            model: 'muc_tieu',
                        },
                    },
                ],
            })
            .execPopulate();

        for (let i = 0; i < days.danhGia.length; i++) {
            if (days.danhGia[i].nguoiDG.maND === ma)
                result.push(days.danhGia[i]);
        }
        return result;
    }

    async traDanhGia_theoMaND(ma: string) {
		const result = []
        const user = await (
            await this.ndSer.findOne_byMaND(ma)
        )
            .populate({
                path: 'danhGia',
                model: 'danh_gia',
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

        for (let i = 0; i < user.danhGia.length; i++) {
			result.push(user.danhGia[i])
		}
		return result
    }

    async traDanhGia_theoID(id: string) {
        const user = await (await this.ndSer.findOne_byID(id)).ma;
        return await this.traDanhGia_theoMaND(user);
    }

    async kiemTra_dangNhap(username: string, password: string) {
        const user = await this.ndSer.findOne_byMaND(username);
        const pass = await this.ndSer.onlyPassword(username);
        if (!user)
            return {
                id: null,
                resOK: false,
            };
        else {
            if (password === pass)
                return {
                    id: user.id,
                    resOK: true,
                };
            else
                return {
                    id: null,
                    resOK: false,
                };
        }
    }

    async traTietHoc_trongNgay(ngay: string) {
        return await (await this.ngaySer.findOne(ngay))
            .populate('tietHoc')
            .execPopulate();
    }

    async traThongBao(kieu: string) {
        let result = [];
        switch (kieu) {
            case 'hoc-tap':
                result = await this.tbSer.findAll_byType('HT');
                break;
            case 'hoc-phi':
                result = await this.tbSer.findAll_byType('HP');
                break;
            case 'hoat-dong':
                result = await this.tbSer.findAll_byType('HĐ');
                break;
            default:
                break;
        }
        return result;
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
