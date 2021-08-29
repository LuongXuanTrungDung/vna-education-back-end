import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assign } from '../../helpers/utilities';
import { LienHeDto } from './lien-he.dto';
import { LienHeDocument } from './lien-he.entity';

@Injectable()
export class LienHeService {
    constructor(@InjectModel('lien_he') private model: Model<LienHeDocument>) {}

    async create(dto: LienHeDto) {
        return await this.model.create(dto);
    }

    async findAll() {
        return await this.model.find();
    }

    async findOne(id: string) {
        return await this.model.findById(id);
    }

    async update(id: string, dto: LienHeDto) {
        return await this.model.findById(id, null, null, async (err, doc) => {
            if (err) throw err;
            assign(dto, doc);
            await doc.save();
        });
    }

    async remove(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
