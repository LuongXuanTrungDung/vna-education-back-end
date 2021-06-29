import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '../../auth.guard';
import { QuanTriService } from './quan-tri.service';

@Controller('quan-tri')
@UseGuards(AuthGuard)
@ApiTags('quan-tri')
export class QuanTriController {
    constructor(private service: QuanTriService) {}

    @Get()
    @Render('quan-tri')
    async quanTri() {
        return '';
    }
}
