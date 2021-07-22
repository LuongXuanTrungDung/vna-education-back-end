import { forwardRef, Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungSchema } from './nguoi-dung.entity';
import { LopHocModule } from '../lop-hoc/lop-hoc.module';
import { hash } from 'bcrypt';
import { HookNextFunction } from 'mongoose';
import { HocSinhUtils } from './roles/hoc-sinh.utils';
import { GiaoVienUtils } from './roles/giao-vien.utils';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: 'nguoi_dung',
                collection: 'nguoi_dung',
                useFactory: async () => {
                    const schema = NguoiDungSchema;
                    schema.pre('save', async function (next: HookNextFunction) {
                        try {
                            if (!this.isModified('matKhau')) return next();
                            this['matKhau'] = await hash(this['matKhau'], 10);
                            return next();
                        } catch (err) {
                            return next(err);
                        }
                    });
                    return schema;
                },
            },
        ]),
        forwardRef(() => LopHocModule),
    ],
    controllers: [NguoiDungController],
    providers: [NguoiDungService, HocSinhUtils, GiaoVienUtils],
    exports: [NguoiDungService, HocSinhUtils, GiaoVienUtils],
})
export class NguoiDungModule {}
