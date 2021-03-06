import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hashSync } from 'bcrypt';
import { isValidObjectId, Model, Types } from 'mongoose';
import { ChangePassDTO, SetPassDTO } from '../../../helpers/changePass.dto';
import { QuenMatKhauService } from '../../quen-mat-khau/quen-mat-khau.service';
import { NguoiDungDocument } from '../nguoi-dung.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('nguoi_dung') private model: Model<NguoiDungDocument>,
        private readonly qmkSer: QuenMatKhauService,
    ) {}

    async getOne_bymaND(ma: string) {
        const user = await this.model.findOne({ maND: ma });
        if (user) return user;
        else return null;
    }

    async onlyPassword(ma: string) {
        const user = await this.model.findOne(
            { maND: ma },
            null,
            null,
            (err, doc) => {
                if (err) return null;
                else return doc;
            },
        );
        if (user) return user.matKhau;
        else return null;
    }

    async changePass(dto: ChangePassDTO) {
        if (!isValidObjectId(dto.idUser))
            return {
                msg: '_id người dùng không hợp lệ',
                checkOK: false,
            };

        const user = await this.model.aggregate([
            { $match: { _id: Types.ObjectId(dto.idUser) } },
            {
                $project: {
                    maND: 1,
                    matKhau: 1,
                },
            },
        ]);

        if (user[0]) {
            if (await compare(dto.oldPass, user[0].matKhau)) {
                await this.model.findByIdAndUpdate(
                    user[0]._id,
                    { $set: { matKhau: hashSync(dto.newPass, 10) } },
                    { new: true },
                );
                return {
                    msg: 'Đổi mật khẩu thành công!',
                    checkOK: true,
                };
            } else
                return {
                    msg: 'Mật khẩu cũ không đúng!',
                    checkOK: false,
                };
        } else
            return {
                msg: 'Người dùng không tồn tại!',
                checkOK: false,
            };
    }

    async setPass(dto: SetPassDTO) {
        if (!isValidObjectId(dto.idUser))
            return {
                msg: '_id người dùng không hợp lệ',
                checkOK: false,
            };

        const user = await this.model.findById(dto.idUser);
        if (user) {
            await this.model.findByIdAndUpdate(
                dto.idUser,
                { $set: { matKhau: hashSync(dto.newPass, 10) } },
                { new: true },
            );

            await this.qmkSer.update(dto.qmkID, {
                nguoiDung: null,
                emailND: null,
                conHan: false,
            });

            return {
                msg: 'Đặt mật khẩu mới thành công!',
                checkOK: true,
            };
        } else
            return {
                msg: 'Người dùng không tồn tại!',
                checkOK: false,
            };
    }

    async toggleActivation(account: string, state: boolean) {
        return await this.model.findByIdAndUpdate(
            account,
            {
                $set: { dangHoatDong: state },
            },
            { new: true },
        );
    }

    async findOne_byEmail(email: string) {
        const user = await this.model.findOne({ emailND: email });
        return {
            _id: user._id,
            maND: user.maND,
            hoTen: user.hoTen,
            soDienThoai: user.soDienThoai ? user.soDienThoai : null,
            dangHoatDong: user.dangHoatDong,
        };
    }
}
