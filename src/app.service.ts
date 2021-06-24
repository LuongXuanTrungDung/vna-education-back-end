import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Types } from 'mongoose';
import { BangDiemService } from './models/bang-diem/bang-diem.service';
import { DanhGiaService } from './models/danh-gia/danh-gia.service';
import { LopHocService } from './models/lop-hoc/lop-hoc.service';
import { MonHocService } from './models/mon-hoc/mon-hoc.service';
import { NgayHocService } from './models/ngay-hoc/ngay-hoc.service';
import { NguoiDungService } from './models/nguoi-dung/nguoi-dung.service';
import { ThongBaoService } from './models/thong-bao/thong-bao.service';

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
                        path: 'doiTuongDG',
                        model: 'nguoi_dung',
                    },
                    {
                        path: 'monHoc',
                        model: 'mon_hoc',
                    },
                ],
            })
            .execPopulate();

        for (let i = 0; i < days.danhGia.length; i++) {
            if (days.danhGia[i].nguoiDG.maND === ma) {
                const temp = {
                    ten: days.danhGia[i].tenDG,
                    gv: days.danhGia[i].doiTuongDG.hoTen,
                    mon: days.danhGia[i].monHoc.tenMH,
                    trangThai: days.danhGia[i].trangThai,
                };
                result.push(temp);
            }
        }
        return result;
    }

    async traDanhGia_theoMaND(ma: string) {
        const result = [];
        const revs = await (await this.ndSer.findOne_byMaND(ma)).danhGia;
        const user = await (
            await this.ndSer.findOne_byMaND(ma)
        )
            .populate({
                path: 'danhGia',
                model: 'danh_gia',
                populate: [
                    {
                        path: 'monHoc',
                        model: 'mon_hoc',
                    },
                    {
                        path: 'doiTuongDG',
                        model: 'nguoi_dung',
                    },
                    {
                        path: 'ngayDG',
                        model: 'ngay_hoc',
                    },
                ],
            })
            .execPopulate();

        for (let i = 0; i < user.danhGia.length; i++) {
            const temp = {
                id: revs[i],
                ten: user.danhGia[i].tenDG,
                gv: user.danhGia[i].doiTuongDG.hoTen,
                mon: user.danhGia[i].monHoc.tenMH,
                trangThai: user.danhGia[i].trangThai,
                ngayDG: user.danhGia[i].ngayDG.maNgay,
            };
            result.push(temp);
        }
        return result;
    }

    async traDanhGia_theoID(id: string) {
        const result = [];
        const revs = await this.dgSer.findAll();
        for (let i = 0; i < revs.length; i++) {
            if (revs[i].nguoiDG === id) {
                const { nguoiDG, ...rest } = revs[i];
                result.push(rest);
            }
        }
        return result;
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
            if (compare(password, pass))
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
}
