import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { CreateLopHocDto } from './dto/create-lop-hoc.dto';
import { UpdateLopHocDto } from './dto/update-lop-hoc.dto';
import { LopHocDocument } from './lop-hoc.entity';

@Injectable()
export class LopHocService {
    constructor(
        @InjectModel('lop_hoc') private model: Model<LopHocDocument>,
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: CreateLopHocDto) {
        const temp = [];
        for (let i = 0; i < dto.hocSinh.length; i++) {
            temp.push(Types.ObjectId(dto.hocSinh[i]));
        }
        return await this.model.create({
            maLH: dto.maLH,
            GVCN: Types.ObjectId(dto.GVCN),
            hocSinh: temp,
        });
    }

    async forSelect() {
        const result = [];
        const mh = await this.findAll();
        for (let i = 0; i < mh.length; i++) {
            result.push({
                id: mh[i]._id,
                ten: mh[i].maLH,
            });
        }
        return result;
    }

    async findAll() {
        return await this.model.find({});
    }

    async findOne(id: string) {
        return await this.model.findById(id, null, null, (err, doc) => {
            if (err) {
                console.log(err);
                return null;
            } else return doc;
        });
    }

    async update(id: string, dto: UpdateLopHocDto) {
        await this.findOne(id).then(async (doc) => {
            if (dto.hocSinh && dto.hocSinh.length > 0) {
                const temp = [];
                for (let i = 0; i < dto.hocSinh.length; i++) {
                    temp.push((await this.ndSer.getOne(dto.hocSinh[i]))._id);
                }
                doc.hocSinh = temp;
            }

            if (dto.GVCN) doc.GVCN = (await this.ndSer.getOne(dto.GVCN))._id;
            if (dto.maLH) doc.maLH = dto.maLH;
            await doc.save();
        });

        return await this.findOne(id);
    }

    async remove(id: string) {
        return await this.model.findOneAndDelete({ maLH: id });
    }
}
