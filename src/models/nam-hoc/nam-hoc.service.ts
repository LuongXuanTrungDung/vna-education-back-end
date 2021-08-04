import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assign, bulkObjectID } from '../../helpers/utilities';
import { TuanHocService } from '../tuan-hoc/tuan-hoc.service';
import { CreateNamHocDto } from './dto/create-nam-hoc.dto';
import { UpdateNamHocDTO } from './dto/update-nam-hoc.dto';
import { NamHocDocument } from './nam-hoc.entity';

@Injectable()
export class NamHocService {
	constructor(
		@InjectModel('nam_hoc') private model: Model<NamHocDocument>,
		private readonly tuanSer: TuanHocService,
	) { }

	async create(dto: CreateNamHocDto) {
		return await this.model.create({
			...dto,
			tuanHoc: [],
		});
	}

	async findAll() {
		const all = await this.model
			.find()
			.populate({
				path: 'tuanHoc',
				select: [
					'tenTuan',
					'soTuan',
					'hocKy',
					'ngayBatDau',
					'ngayKetThuc',
				],
			})
			.exec();
		const result = [];

		for (let i = 0; i < all.length; i++) {
			result.push({
				_id: all[i]._id,
				tenNam: all[i].tenNam,
				namBatDau: all[i].namBatDau,
				namKetThuc: all[i].namKetThuc,
				tuanHoc: all[i].tuanHoc
					.map((val, ind) => {
						return {
							_id: all[i].populated('tuanHoc')[ind],
							tenTuan: val.tenTuan,
							soTuan: val.soTuan,
							ngayBatDau: val.ngayBatDau,
							ngayKetThuc: val.ngayKetThuc,
							hocKy: val.hocKy,
						};
					})
					.sort((a, b) => {
						return a.soTuan - b.soTuan;
					}),
			});
		}
		return result;
	}

	async findOne(nam: string) {
		const one = await (
			await this.model.findById(nam)
		)
			.populate({
				path: 'tuanHoc',
				select: [
					'tenTuan',
					'soTuan',
					'hocKy',
					'ngayBatDau',
					'ngayKetThuc',
				],
			})
			.execPopulate();

		return {
			_id: nam,
			tenNam: one.tenNam,
			namBatDau: one.namBatDau,
			namKetThuc: one.namKetThuc,
			tuanHoc: one.tuanHoc
				.sort((a, b) => {
					return a.soTuan - b.soTuan;
				}),
		};
	}

	async getAll() {
		const all = await this.model
			.find()
			.populate({
				path: 'tuanHoc',
				select: [
					'tenTuan',
					'soTuan',
					'hocKy',
					'ngayBatDau',
					'ngayKetThuc',
				],
			})
			.exec();
		const result = [];

		for (let i = 0; i < all.length; i++) {
			result.push({
				_id: all[i]._id,
				tenNam: all[i].tenNam,
				namBatDau: all[i].namBatDau,
				namKetThuc: all[i].namKetThuc,
				tuanHoc: all[i].tuanHoc.sort((a, b) => {
					return a.soTuan - b.soTuan;
				}),
			});
		}
		return result;
	}

	async getLatest() {
		const all = await this.getAll();
		const thisYear = new Date().getFullYear()
		for (let i = 0; i < all.length; i++) {
			if (all[i].namBatDau <= thisYear && all[i].namKetThuc >= thisYear) {
				return all[i];
				break;
			}
		}
	}

	async getLatest_latestWeek() {
		const latest = await this.getLatest();
		return latest.tuanHoc[0];
	}

	async update(id: string, dto: UpdateNamHocDTO) {
		const { tuanHoc, ...rest } = dto;
		return await this.model.findById(id, null, null, async (err, doc) => {
			if (err) throw err;
			assign(rest, doc);
			if (tuanHoc)
				doc.tuanHoc = await this.tuanSer.bulkObjectify(tuanHoc);
			await doc.save();
		});
	}

	async addWeeks(id: string, weeks: string[]) {
		return await this.model.findByIdAndUpdate(id, {
			$push: { tuanHoc: { $each: bulkObjectID(weeks) } },
		});
	}

	async remove(id: string) {
		return this.model.findByIdAndDelete(id);
	}
}
