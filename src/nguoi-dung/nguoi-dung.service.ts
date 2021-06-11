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
    ) {}

    async create(dto: CreateNguoiDungDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne_byMaND(ma: string) {
        return await this.model.findOne({ maND: id });
    }

	async findOne_byID(id: string) {
		return await this.model.findById(id)
	}

    async update(id: string, dto: UpdateNguoiDungDto) {
        return await this.model.findOneAndUpdate({ maND: id }, dto);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maND: id });
    }
}
