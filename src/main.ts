import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.use(compression());
    app.use(helmet());
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
    app.setViewEngine('pug');

    const config = new DocumentBuilder()
        .setTitle('VNA Education- Quản lý giáo dục')
        .setDescription('Ứng dụng đánh giá chất lượng giáo dục')
        .setVersion('3')
        .addTag('nguoi-dung', 'Các API CRUD cho model nguoi_dung')
        .addTag('muc-tieu', 'Các API CRUD cho model nguoi_dung')
        .addTag('danh-gia', 'Các API CRUD cho model danh_gia')
        .addTag('tieu-chi', 'Các API CRUD cho model tieu_chi')
        .addTag('thong-bao', 'Các API CRUD cho model thong_bao')
        .addTag('bang-diem', 'Các API CRUD cho model bang_diem')
        .addTag('diem-danh', 'Các API CRUD cho model diem_danh')
        .addTag('chung', 'Các API chung')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(process.env.SERVER_PORT || 3000);
})();
