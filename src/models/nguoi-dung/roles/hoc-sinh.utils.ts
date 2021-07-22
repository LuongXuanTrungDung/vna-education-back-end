import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LopHocService } from '../../lop-hoc/lop-hoc.service';
import { ImportHSDTO } from '../dto/import-hs.dto';
import { NguoiDungDocument } from '../nguoi-dung.entity';
import { NguoiDungService } from '../nguoi-dung.service';

@Injectable()
export class HocSinhUtils {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
        @Inject(forwardRef(() => LopHocService))
        private readonly lhSer: LopHocService,
        private readonly ndSer: NguoiDungService,
    ) {}

    async importHS(dto: ImportHSDTO) {
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

            if (dto.lopHoc[i])
                result = Object.assign(result, {
                    lopHoc: await this.lhSer.objectify_fromName(dto.lopHoc[i]),
                });

            toImport.push(result);
        }
        return await this.model.insertMany(toImport);
    }

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
