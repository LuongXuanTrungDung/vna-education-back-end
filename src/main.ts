import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.use(compression());
    app.use(helmet());

    app.useStaticAssets(join(__dirname, '..', '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
    app.setViewEngine('pug');

    const config = new DocumentBuilder()
        .setTitle('VNA Education- Quản lý giáo dục')
        .setDescription('Ứng dụng đánh giá chất lượng giáo dục')
        .setVersion('3')
        .addTag('nguoi-dung', 'Các API CRUD cho model nguoi_dung')
        .addTag('danh-gia', 'Các API CRUD cho model danh_gia')
        .addTag('thong-bao', 'Các API CRUD cho model thong_bao')
        .addTag('bang-diem', 'Các API CRUD cho model bang_diem')
        .addTag('diem-danh', 'Các API CRUD cho model diem_danh')
        .addTag('hoc-ky', 'Các API CRUD cho model hoc_ky')
        .addTag('lop-hoc', 'Các API CRUD cho model lop_hoc')
        .addTag('mon-hoc', 'Các API CRUD cho model mon_hoc')
        .addTag('ngay-hoc', 'Các API CRUD cho model ngay_hoc')
        .addTag('tiet-hoc', 'Các API CRUD cho model tiet_hoc')
        .addTag('tuan-hoc', 'Các API cho model tuan_hoc')
        .addTag('chung', 'Các API chung')
        .addTag('hieu-truong', 'Các API cho người dùng là hiệu trưởng')
        .addTag(
            'quan-tri',
            'Các API cho người dùng là quản trị viên hoặc quản lý',
        )
        .addTag('hoc-sinh', 'Các API cho người dùng là học sinh')
        .addTag('phu-huynh', 'Các API cho người dùng là phụ huynh')
        .addTag('giao-vien', 'Các API cho người dùng là giáo viên')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(process.env.SERVER_PORT || 8000);
})();
