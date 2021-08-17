import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { arrange } from '../../../helpers/utilities';
import { DanhGiaDocument } from '../danh-gia.entity';

@Injectable()
export class ChoHieuTruongService {
	constructor(
		@InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
	) { }

	async findAll_ofGVBM(gv: string, lop: string) {
		const all = await this.model
			.find({
				giaoVien: Object(gv),
				lopHoc: Object(lop),
			})
			.populate([
				{ path: 'monHoc', select: 'tenMH' },
				{
					path: 'giaoVien',
					select: 'hoTen',
				},
				{
					path: 'lopHoc',
					select: ['maLH', 'hocSinh'],
				},
				{
					path: 'tuanDG',
					select: 'soTuan',
				},
			])
			.exec();
		const result = [];

		for (let i = 0; i < all.length; i++) {
			let temp = 0,
				diem = 0;
			for (let j = 0; j < all[i].chiTiet.length; j++) {
				temp += all[i].chiTiet[j].diemDG;
			}
			diem = temp / all[i].chiTiet.length;

			result.push({
				_id: all[i]._id,
				tenDG: all[i].tenDG,
				monHoc: all[i].monHoc ? all[i].monHoc : null,
				giaoVien: all[i].giaoVien ? all[i].giaoVien : null,
				lopHoc: all[i].lopHoc
					? {
						_id: all[i].populated('lopHoc'),
						maLH: all[i].lopHoc.maLH,
						siSo: all[i].lopHoc.hocSinh.length,
					}
					: null,
				tuanDG: all[i].tuanDG ? all[i].tuanDG : null,
				luotDG: all[i].chiTiet.length,
				diemTB: all[i].chiTiet.length > 0 ? diem : 0,
			});
		}
		return result;
	}

	async findOne_ofGVCN(id: string) {
		const one = await this.model
			.findById(id)
			.populate([
				{ path: 'monHoc', select: 'tenMH' },
				{
					path: 'giaoVien',
					select: 'hoTen',
				},
				{
					path: 'lopHoc',
					select: ['maLH', 'hocSinh'],
				},
				{
					path: 'tuanDG',
					select: 'soTuan',
				},
			])
			.exec();

		let temp = 0,
			diem = 0;
		for (let i = 0; i < one.chiTiet.length; i++) {
			temp += one.chiTiet[i].diemDG;
		}
		diem = temp / one.chiTiet.length;

		return {
			_id: id,
			tenDG: one.tenDG,
			monHoc: one.monHoc ? one.monHoc : null,
			giaoVien: one.giaoVien ? one.giaoVien : null,
			lopHoc: one.lopHoc
				? {
					_id: one.populated('lopHoc'),
					maLH: one.lopHoc.maLH,
					siSo: one.lopHoc.hocSinh.length,
				}
				: null,
			tuanDG: one.tuanDG ? one.tuanDG : null,
			chiTiet: one.chiTiet,
			luotDG: one.chiTiet.length,
			diemTB: one.chiTiet.length > 0 ? diem : 0,
		};
	}

	async getAll_forHT(tuan: string, lop = 'all') {
		const query = { tuanDG: Object(tuan) };
		if (Types.ObjectId.isValid(lop))
			Object.assign(query, { lopHoc: Object(lop) });

		const result = [];
		const now = new Date().getTime();
		const all = await this.model
			.find(query)
			.populate([
				{
					path: 'giaoVien',
					select: 'hoTen',
				},
				{ path: 'monHoc', select: 'tenMH' },
				{
					path: 'lopHoc',
					select: ['maLH', 'hocSinh'],
				},
				{
					path: 'tuanDG',
					select: ['soTuan', 'ngayKetThuc'],
				},
			])
			.exec();

		for (let i = 0; i < all.length; i++) {
			let diem = 0,
				temp = 0;
			for (let j = 0; j < all[i].chiTiet.length; j++) {
				temp += all[i].chiTiet[j].diemDG;
			}
			diem = temp / all[i].chiTiet.length;

			result.push({
				_id: all[i]._id,
				tenDG: all[i].tenDG,
				monHoc: all[i].monHoc ? {
					_id: all[i].populated('monHoc'),
					tenMH: all[i].monHoc.tenMH
				} : null,
				lopHoc: all[i].lopHoc ? {
					_id: all[i].populated('lopHoc'),
					maLH: all[i].lopHoc?.maLH,
					siSo: all[i].lopHoc?.hocSinh.length,
				} : null,
				giaoVien: all[i].giaoVien?.hoTen,
				choGVCN: all[i].choGVCN,
				daDuyet: all[i].daDuyet,
				tuanDG: all[i].tuanDG?.soTuan,
				luotDG: all[i].chiTiet.length,
				diemTB: diem,
				hetHan: arrange(all[i].tuanDG.ngayKetThuc).getTime() < now,
			});
		}
		return result;
	}

	async getOne_forHT(dg: string) {
		const one = await this.model
			.findById(dg)
			.populate([
				{
					path: 'giaoVien',
					select: 'hoTen',
				},
				{ path: 'monHoc', select: 'tenMH' },
				{ path: 'mauDG', select: 'tieuChi' },
				{
					path: 'lopHoc',
					select: ['maLH', 'hocSinh'],
				},
				{
					path: 'tuanDG',
					select: 'soTuan',
				},
			])
			.exec();

		let temp = 0,
			diem = 0;
		for (let i = 0; i < one.chiTiet.length; i++) {
			temp += one.chiTiet[i].diemDG;
		}
		diem = temp / one.chiTiet.length;

		return {
			_id: dg,
			tenDG: one.tenDG,
			monHoc: one.monHoc?.tenMH,
			giaoVien: one.giaoVien?.hoTen,
			tieuChi: one.mauDG?.tieuChi,
			choGVCN: one.choGVCN,
			daDuyet: one.daDuyet,
			lopHoc: {
				maLH: one.lopHoc?.maLH,
				siSo: one.lopHoc?.hocSinh.length,
			},
			tuanDG: one.tuanDG?.soTuan,
			luotDG: one.chiTiet.length,
			chiTiet: one.chiTiet,
			diemDG: one.chiTiet.length > 0 ? diem : 0,
		};
	}

	async approve(dg: string, tinhTrang = true) {
		return await this.model.findByIdAndUpdate(
			dg,
			{ $set: { daDuyet: tinhTrang } },
			{ new: true },
		);
	}
}
