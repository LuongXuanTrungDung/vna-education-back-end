import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { MauDanhGia } from '../../mau-danh-gia/mau-danh-gia.entity';
import { MonHoc } from '../../mon-hoc/mon-hoc.entity';
import { NgayHoc } from '../../ngay-hoc/ngay-hoc.entity';
import { NguoiDung } from '../../nguoi-dung/nguoi-dung.entity';

export class CreateDanhGiaDto {
    @ApiProperty({
        required: true,
        name: 'tenDG',
        type: String,
        description: 'Tên gọi của đánh giá',
        example: 'Đánh giá gì đó',
    })
    tenDG: string;

    @ApiProperty({
        required: true,
        name: 'nguoiDG',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Học sinh hay phụ huynh thực hiện đánh giá',
    })
    nguoiDG: NguoiDung;

    @ApiProperty({
        required: true,
        name: 'doiTuongDG',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Giáo viên được đánh giá',
    })
    doiTuongDG: NguoiDung;

    @ApiProperty({
        required: true,
        name: 'ngayDG',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Ngày thực hiện đánh giá',
    })
    ngayDG: NgayHoc;

    @ApiProperty({
        required: true,
        name: 'choGVCN',
        type: Boolean,
        description: 'Đánh giá có phải cho GVCN',
    })
    choGVCN: boolean;

    @ApiProperty({
        required: true,
        name: 'mauDG',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Mẫu đánh giá',
    })
    mauDG: MauDanhGia;
}
