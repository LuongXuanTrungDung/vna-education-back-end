import { PartialType } from '@nestjs/swagger';
import { CreateTieuChiDto } from './create-tieu-chi.dto';

export class UpdateTieuChiDto extends PartialType(CreateTieuChiDto) {}
