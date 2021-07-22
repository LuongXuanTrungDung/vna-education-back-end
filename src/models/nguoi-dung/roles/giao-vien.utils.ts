import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LopHocService } from '../../lop-hoc/lop-hoc.service';
import { ImportGVDTO } from '../dto/import-gv.dto';
import { NguoiDungDocument } from '../nguoi-dung.entity';
import { NguoiDungService } from '../nguoi-dung.service';

@Injectable()
export class GiaoVienUtils {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
        @Inject(forwardRef(() => LopHocService))
        private readonly lhSer: LopHocService,
        private readonly ndSer: NguoiDungService,
    ) {}

    async importGV(dto: ImportGVDTO) {
        const toImport = [];

        for (let i = 0; i < dto.maND.length; i++) {
            let result = {
                maND: dto.maND[i],
                hoTen: dto.hoTen[i],
                dangHoatDong: dto.dangHoatDong[i],
                emailND: dto.emailND[i],
                soDienThoai: dto.soDienThoai[i],
                noiSinh: dto.noiSinh[i],
                ngaySinh: dto.ngaySinh[i],
                danToc: dto.danToc[i],
                quocTich: dto.quocTich[i],
                diaChi: dto.diaChi[i],
                gioiTinh: dto.gioiTinh[i],
                matKhau: dto.matKhau[i],
            };

            if (dto.cccd[i] && dto.ngayCap[i] && dto.noiCap[i])
                result = Object.assign(result, {
                    cccd: {
                        maSo: dto.cccd[i],
                        ngayCap: dto.ngayCap[i],
                        noiCap: dto.noiCap[i],
                    },
                });

            if (dto.chuNhiem[i])
                result = Object.assign(result, {
                    chuNhiem: await this.lhSer.objectify_fromName(
                        dto.chuNhiem[i],
                    ),
                });

            if (dto.chucVu[i] && dto.hopDong[i] && dto.tDCM[i])
                result = Object.assign(result, {
                    chucVu: {
                        chucVu: dto.chucVu[i],
                        hopDong: dto.hopDong[i],
                        trinhDo: dto.tDCM[i],
                    },
                });

            toImport.push(result);
        }

        return await this.model.insertMany(toImport);
    }

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
