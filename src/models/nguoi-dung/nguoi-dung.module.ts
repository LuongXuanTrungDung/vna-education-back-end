import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LopHocModule } from '../lop-hoc/lop-hoc.module';
import { QuenMatKhauModule } from '../quen-mat-khau/quen-mat-khau.module';
import { AccountService } from './actions/account.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { NguoiDungSchema } from './nguoi-dung.entity';
import { NguoiDungService } from './nguoi-dung.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'nguoi_dung',
                collection: 'nguoi_dung',
                schema: NguoiDungSchema,
            },
        ]),
        forwardRef(() => LopHocModule),
        forwardRef(() => QuenMatKhauModule),
    ],
    controllers: [NguoiDungController],
    providers: [NguoiDungService, AccountService],
    exports: [NguoiDungService, AccountService],
})
export class NguoiDungModule {}
