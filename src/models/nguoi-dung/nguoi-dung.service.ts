import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { NguoiDungDocument } from './nguoi-dung.entity';

@Injectable()
export class NguoiDungService {
	constructor(
		@InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
	) { }

	async create(dto: CreateNguoiDungDto) {
		return await this.model.create(dto);
	}

	async forSelect_giaoVien() {
		const result = [];
		const gv = await this.findAll_byRole('GV');
		for (let i = 0; i < gv.length; i++) {
			result.push({
				id: gv[i]._id,
				ten: gv[i].hoTen,
			});
		}
		return result;
	}

	async forSelect_hocSinh() {
		const result = [];
		const hs = await this.findAll_byRole('HS');
		for (let i = 0; i < hs.length; i++) {
			result.push({
				id: hs[i]._id,
				ten: hs[i].hoTen,
			});
		}
		return result;
	}

	async findAll() {
		return await this.model.find({});
	}

	async findAll_byRole(role: string) {
		const reg = new RegExp(role, 'i');
		return await this.model.find({ maND: reg });
	}

	async findOne_byMaND(ma: string) {
		return await this.model.findOne({ maND: ma });
	}

	async findOne_byID(id: string) {
		const user = await (await this.model.findById(id)).populate([{
			path: 'lopHoc',
			model: 'lop_hoc'
		}, {
			path: 'chuNhiem',
			model: 'lop_hoc'
		}]).execPopulate();
		return {
			id: id,
			maND: user.maND,
			hoTen: user.hoTen,
			emailND: user.emailND,
			diaChi: user.diaChi,
			ngaySinh:
				user.ngaySinh.getDate() +
				'-' +
				user.ngaySinh.getMonth() +
				'-' +
				user.ngaySinh.getFullYear(),
			gioiTinh: user.gioiTinh,
			soDienThoai: user.soDienThoai,
			quocTich: user.quocTich,
			danToc: user.danToc,
			cccd: user.cccd,
			hoChieu: user.hoChieu,
			ngayNhapHoc: user.ngayNhapHoc.getDate() +
				'-' +
				user.ngayNhapHoc.getMonth() +
				'-' +
				user.ngayNhapHoc.getFullYear(),
			lopHoc: (user.lopHoc) ? user.lopHoc.maLH : null,
			chuNhiem: (user.chuNhiem) ? user.chuNhiem.maLH : null,
			chucVu: user.chucVu,
		};
	}

	async onlyPassword(ma: string) {
		return (await this.model.findOne({ maND: ma })).matKhau;
	}

	async update(id: string, dto: UpdateNguoiDungDto) {
		return await this.model.findOneAndUpdate({ maND: id }, dto);
	}

	async remove(id: string) {
		return await this.model.findOneAndDelete({ maND: id });
	}
}
