import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from 'nestjs-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { MucTieuModule } from './muc-tieu/muc-tieu.module';
import { TieuChiModule } from './tieu-chi/tieu-chi.module';
import { DanhGiaModule } from './danh-gia/danh-gia.module';
import { ThongBaoModule } from './thong-bao/thong-bao.module';
import { BangDiemModule } from './bang-diem/bang-diem.module';
import { DiemDanhModule } from './diem-danh/diem-danh.module';
import { TuanHocModule } from './tuan-hoc/tuan-hoc.module';
import { NgayHocModule } from './ngay-hoc/ngay-hoc.module';
import { TietHocModule } from './tiet-hoc/tiet-hoc.module';
import { LopHocModule } from './lop-hoc/lop-hoc.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SessionModule.forRoot({
            session: {
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
            },
        }),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.dlidw.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        ),
        NguoiDungModule,
        MucTieuModule,
        TieuChiModule,
        DanhGiaModule,
        ThongBaoModule,
        BangDiemModule,
        DiemDanhModule,
        TuanHocModule,
        NgayHocModule,
        TietHocModule,
        LopHocModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
