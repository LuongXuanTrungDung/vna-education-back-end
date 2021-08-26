import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccountService } from '../nguoi-dung/actions/account.service';
import { QuenMatKhauDto } from './quen-mat-khau.dto';
import { QuenMatKhauDocument } from './quen-mat-khau.entity';

@Injectable()
export class QuenMatKhauService {
    constructor(
        @InjectModel('quen_matKhau') private model: Model<QuenMatKhauDocument>,
        private readonly accSer: AccountService
    ) {}

    async create(dto: QuenMatKhauDto) {
        const user = await this.accSer.findOne_byEmail(dto.emailND);
        return await this.model.create({
            emailND: dto.emailND,
            nguoiDung: user._id,
            conHan: true,
        });
    }

    async findAll() {
        const all = await this.model
            .find()
            .populate({ path: 'nguoiDung', select: 'hoTen' })
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                emailND: all[i].emailND,
                nguoiDung: all[i].nguoiDung
                    ? {
                          _id: all[i].populated('nguoiDung'),
                          hoTen: all[i].nguoiDung.hoTen,
                      }
                    : null,
                conHan: all[i].conHan,
            });
        }
        return result;
    }

    async findOne(id: string) {
        const one = await this.model
            .findById(id)
            .populate({ path: 'nguoiDung', select: 'hoTen' })
            .exec();
        return {
            _id: id,
            emailND: one.emailND,
            nguoiDung: one.nguoiDung
                ? {
                      _id: one.populated('nguoiDung'),
                      hoTen: one.nguoiDung.hoTen,
                  }
                : null,
            conHan: one.conHan,
        };
    }

    async update(id: string, dto: QuenMatKhauDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            if (dto.emailND) doc.emailND = dto.emailND;
            doc.conHan = dto.conHan ? dto.conHan : false;
            await doc.save();
        });
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
