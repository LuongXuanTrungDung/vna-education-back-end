import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DanhGiaDocument } from './danh-gia.entity';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { HSDGDto } from './dto/HSDG.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Injectable()
export class DanhGiaService {
	constructor(
		@InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
	) { }

	async create(dto: CreateDanhGiaDto) {
		return await this.model.create(dto);
	}

	async findAll_byUser(classe: string) {
		const result = [];
		const revs = await this.findAll();
		for (let i = 0; i < revs.length; i++) {
			if (revs[i].chiTiet.lopHoc == classe) {
				result.push(revs[i])
			}
		}
		return result;
	}

	async findAll() {
		const result = [];
		const all = await (
			await this.model
		)
			.find({})
			.populate([
				{
					path: 'giaoVien',
					model: 'nguoi_dung',
				},
				{ path: 'monHoc', model: 'mon_hoc' },
				{
					path: 'mauDG',
					model: 'mau_danh_gia',
				},
				{
					path: 'lopHoc',
					model: 'lop_hoc',
				},
			])
			.exec();
		for (let i = 0; i < all.length; i++) {
			result.push({
				id: all[i]._id,
				tenDG: all[i].tenDG,
				ngayDG: all[i].ngayDG.getDate() + '-' + all[i].ngayDG.getMonth() + '-' + all[i].ngayDG.getFullYear(),
				tieuChi: all[i].mauDG.tieuChi,
				monHoc: all[i].monHoc.tenMH,
				giaoVien: all[i].giaoVien.hoTen,
				choGVCN: all[i].choGVCN,
				chiTiet: {
					lopHoc: all[i].lopHoc.maLH,
					siSo: all[i].lopHoc.hocSinh.length,
					diemForm: all[i].chiTiet,
				},
			});
		}
		return result;
	}

	async findOne(id: string) {
		const rev = await (
			await this.model.findById(id)
		)
			.populate([
				{
					path: 'giaoVien',
					model: 'nguoi_dung',
				},
				{ path: 'monHoc', model: 'mon_hoc' },

				{
					path: 'mauDG',
					model: 'mau_danh_gia',
				},
				{
					path: 'lopHoc',
					model: 'lop_hoc',
				}
			])
			.execPopulate();
		return {
			id: rev._id,
			tenDG: rev.tenDG,
			ngayDG: rev.ngayDG.getDate() + '-' + rev.ngayDG.getMonth() + '-' + rev.ngayDG.getFullYear(),
			tieuChi: rev.mauDG.tieuChi,
			monHoc: rev.monHoc.tenMH,
			giaoVien: rev.giaoVien.hoTen,
			choGVCN: rev.choGVCN,
			chiTiet: {
				lopHoc: rev.lopHoc.maLH,
				siSo: rev.lopHoc.hocSinh.length,
				diemForm: rev.chiTiet,
			},
		};
	}

	async update(id: string, dto: UpdateDanhGiaDto) {
		return await this.model.findByIdAndUpdate(id, dto);
	}

	async update_fromHS(id: string, dto: HSDGDto) {
		return await this.model.findByIdAndUpdate(id, {$push: {chiTiet: dto}})
	}

	async remove(id: string) {
		return await this.model.findByIdAndDelete(id);
	}
}
