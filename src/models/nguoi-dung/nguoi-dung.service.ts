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

    async findAll_byRole(role: string) {
        const reg = new RegExp(role, 'i');
        return await this.model.find({ maND: reg });
    }

    async findOne_byMaND(ma: string) {
        const user = await this.model.findOne({ maND: ma });
        const { matKhau, ...rest } = user;
        rest.id = user._id;
        return rest;
    }

    async findOne_byID(id: string) {
        const user = await this.model.findById(id);
        const { matKhau, ...rest } = user;
        rest.id = user._id;
        return rest;
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
