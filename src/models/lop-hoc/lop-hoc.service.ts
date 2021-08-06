import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { bulkObjectID, removeDuplicates } from '../../helpers/utilities';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { LopHocDto } from './lop-hoc.dto';
import { LopHocDocument } from './lop-hoc.entity';

@Injectable()
export class LopHocService {
    constructor(
        @InjectModel('lop_hoc') private model: Model<LopHocDocument>,
        @Inject(forwardRef(() => NguoiDungService))
        private readonly ndSer: NguoiDungService,
    ) {}

    async create(dto: LopHocDto) {
        return await this.model.create({
            maLH: dto.maLH,
            GVCN: Types.ObjectId(dto.GVCN),
            hocSinh: bulkObjectID(dto.hocSinh),
        });
    }

    async findAll(condition: any = {}) {
        const all = await this.model
            .find(condition)
            .populate([
                { path: 'GVCN', select: 'hoTen' },
                { path: 'hocSinh', select: 'hoTen' },
            ])
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                _id: all[i]._id,
                maLH: all[i].maLH,
                GVCN: all[i].GVCN,
                hocSinh: all[i].hocSinh.map((val, index) => {
                    return {
                        _id: all[i].populated('hocSinh')[index],
                        hoTen: val.hoTen,
                    };
                }),
            });
        }
        return result;
    }

    async findOne(lop: string) {
        const classe = await (
            await this.model.findById(lop)
        )
            .populate([
                { path: 'GVCN', select: 'hoTen' },
                { path: 'hocSinh', select: 'hoTen' },
            ])
            .execPopulate();

        return {
            _id: lop,
            maLH: classe.maLH,
            GVCN: classe.GVCN
                ? {
                      _id: classe.populated('GVCN'),
                      hoTen: classe.GVCN.hoTen,
                  }
                : null,
            hocSinh: classe.hocSinh.map((val, index) => {
                return {
                    _id: classe.populated('hocSinh')[index],
                    hoTen: val.hoTen,
                };
            }),
        };
    }

    async addBulkHS(hs: string[], lop: string) {
        const classe = await this.onlyHS(lop);
        const students = await this.ndSer.groupInfo(hs);
        const toAdd = [];

        for (let i = 0; i < classe.length; i++) {
            for (let j = 0; j < students.length; j++) {
                if (students[j].maND !== classe[i].maND)
                    toAdd.push(students[i]._id);
            }
        }

        return await this.model.findByIdAndUpdate(
            lop,
            {
                $push: { hocSinh: { $each: toAdd } },
            },
            { new: true },
        );
    }

    async addOneHS(hs: string, lop: string) {
        let isDupl = false;
        const classe = await this.onlyHS(lop);
        const student = await this.ndSer.quickInfo(hs);

        for (let i = 0; i < classe.length; i++) {
            if (student[0].maND === classe[i]) {
                isDupl = true;
                break;
            }
        }

        return !isDupl
            ? await this.model.findByIdAndUpdate(
                  lop,
                  {
                      $push: { hocSinh: Types.ObjectId(hs) },
                  },
                  { new: true },
              )
            : classe;
    }

    async onlyHS(lop: string) {
        const result = [];
        const p = await (await this.model.findById(lop))
            .populate({ path: 'hocSinh', select: ['maND', 'hoTen'] })
            .execPopulate();

        for (let i = 0; i < p.hocSinh.length; i++) {
            const id = p.populated('hocSinh')[i];
            if (Types.ObjectId.isValid(id))
                result.push({
                    _id: id,
                    maND: p.hocSinh[i].maND,
                    hoTen: p.hocSinh[i].hoTen,
                });
        }
        return result;
    }

    async onlyGV() {
        const all = await this.model
            .find()
            .populate({
                path: 'GVCN',
                select: ['maND', 'hoTen'],
            })
            .exec();
        const result = [];

        for (let i = 0; i < all.length; i++) {
            result.push({
                chuNhiem: all[i].maLH,
                GVCN: {
                    _id: all[i].populated('GVCN'),
                    maND: all[i].GVCN.maND,
                    hoTen: all[i].GVCN.hoTen,
                },
            });
        }
        return result;
    }

    async update(id: string, dto: LopHocDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            if (dto.maLH) doc.maLH = dto.maLH;
            if (dto.GVCN) doc.GVCN = await this.ndSer.objectify(dto.GVCN);
            if (dto.hocSinh)
                doc.hocSinh = await this.ndSer.bulkObjectify(dto.hocSinh);
            await doc.save();
        });
    }

    async objectify_fromName(lop: string) {
        const one = await this.model.findOne(
            { maLH: lop },
            null,
            null,
            async (err, doc) => {
                if (err) {
                    console.log(err);
                    return null;
                } else return doc;
            },
        );
        return one ? one._id : null;
    }

    async objectify_fromID(lop: string) {
        const one = await this.model.findById(
            lop,
            null,
            null,
            async (err, doc) => {
                if (err) {
                    console.log(err);
                    return null;
                } else return doc;
            },
        );
        return one ? one._id : null;
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
