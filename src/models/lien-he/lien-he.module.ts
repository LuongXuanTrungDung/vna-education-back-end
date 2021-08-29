import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LienHeController } from './lien-he.controller';
import { LienHeSchema } from './lien-he.entity';
import { LienHeService } from './lien-he.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'lien_he',
                collection: 'lien_he',
                schema: LienHeSchema,
            },
        ]),
    ],
    controllers: [LienHeController],
    providers: [LienHeService],
    exports: [LienHeService],
})
export class LienHeModule {}
