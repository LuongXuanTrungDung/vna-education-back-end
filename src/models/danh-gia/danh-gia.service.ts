import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DanhGiaDocument } from './danh-gia.entity';
import { CreateDanhGiaDto } from './dto/create-danh-gia.dto';
import { UpdateDanhGiaDto } from './dto/update-danh-gia.dto';

@Injectable()
export class DanhGiaService {
	constructor(
		@InjectModel('danh_gia') private model: Model<DanhGiaDocument>,
	) { }

	async create(dto: CreateDanhGiaDto) {
		return await this.model.create(dto);
	}

	async findAll() {
		return await this.model.find({});
	}

	async findOne(id: string) {
		const rev = await (await this.model.findById(id)).populate([
			{ path: 'ngayDG', model: 'ngay_hoc' },
			{ path: 'doiTuongDG', model: 'nguoi_dung' },
			{ path: 'monHoc', model: 'mon_hoc' }
		]).execPopulate();
		return {
			id: rev._id,
			tenDG: rev.tenDG,
			trangThai: rev.trangThai,
			diemDG: rev.diemDG,
			ngayDG: rev.ngayDG.maNgay,
			tieuChi: rev.tieuChi,
			monHoc: rev.monHoc.tenMH,
			doiTuongDG: rev.doiTuongDG.hoTen
		};
	}

	async update(id: string, dto: UpdateDanhGiaDto) {
		return await this.model.findByIdAndUpdate(id, dto);
	}

	async remove(id: string) {
		return await this.model.findByIdAndDelete(id);
	}
}
