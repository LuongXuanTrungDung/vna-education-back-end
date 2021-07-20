import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './models/nguoi-dung/nguoi-dung.module';
import { DanhGiaModule } from './models/danh-gia/danh-gia.module';
import { ThongBaoModule } from './models/thong-bao/thong-bao.module';
import { DiemDanhModule } from './models/diem-danh/diem-danh.module';
import { TuanHocModule } from './models/tuan-hoc/tuan-hoc.module';
import { TietHocModule } from './models/tiet-hoc/tiet-hoc.module';
import { LopHocModule } from './models/lop-hoc/lop-hoc.module';
import { MonHocModule } from './models/mon-hoc/mon-hoc.module';
import { HocSinhModule } from './users/hoc-sinh/hoc-sinh.module';
import { QuanTriModule } from './users/quan-tri/quan-tri.module';
import { GiaoVienModule } from './users/giao-vien/giao-vien.module';
import { PhuHuynhModule } from './users/phu-huynh/phu-huynh.module';
import { HieuTruongModule } from './users/hieu-truong/hieu-truong.module';
import { MauDanhGiaModule } from './models/mau-danh-gia/mau-danh-gia.module';
import { BangDiemTongModule } from './models/bang-diem-tong/bang-diem-tong.module';
import { BangDiemMonModule } from './models/bang-diem-mon/bang-diem-mon.module';
import { NamHocModule } from './models/nam-hoc/nam-hoc.module';
import { BuoiHocModule } from './models/buoi-hoc/buoi-hoc.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.dlidw.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            },
        ),
        NguoiDungModule,
        DanhGiaModule,
        ThongBaoModule,
        DiemDanhModule,
        TuanHocModule,
        TietHocModule,
        LopHocModule,
        MonHocModule,
        HocSinhModule,
        QuanTriModule,
        GiaoVienModule,
        PhuHuynhModule,
        HieuTruongModule,
        MauDanhGiaModule,
        BangDiemTongModule,
        BangDiemMonModule,
        NamHocModule,
        BuoiHocModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
