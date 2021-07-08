import { ApiProperty } from '@nestjs/swagger';
import { NgayHoc } from '../../ngay-hoc/ngay-hoc.entity';
import { NguoiDung } from '../../nguoi-dung/nguoi-dung.entity';

export class CreateThongBaoDto {
    @ApiProperty({
        required: true,
        name: 'nguoiDang',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Người đăng thông báo',
    })
    nguoiDang: string;

    @ApiProperty({
        required: true,
        name: 'tieuDe',
        type: String,
        example: 'Đây là 1 bài viết hay',
        description: 'Tiêu đề thông báo',
    })
    tieuDe: string;

    @ApiProperty({
        required: true,
        name: 'tomTat',
        type: String,
        example: 'Đây là 1 bài viết không tồi',
        description: 'Nội dung tóm tắt của thông báo',
    })
    tomTat: string;

    @ApiProperty({
        required: true,
        name: 'noiDung',
        type: String,
        example: 'Không không tồi. Không không tồi',
        description: 'Nội dung đầy đủ của thông báo',
    })
    noiDung: string;

    @ApiProperty({
        required: true,
        default: 'Khác',
        name: 'danhMuc',
        type: String,
        description: 'Danh mục của thông báo',
    })
    danhMuc: string;

    @ApiProperty({
        required: true,
        name: 'ngayDang',
        type: String,
        example: '6-7-2021',
        description: 'Ngày đăng thông báo',
    })
    ngayDang: string;

    @ApiProperty({
        default: true,
        name: 'daDuyet',
        type: Boolean,
        description: 'Trạng thái duyệt thông báo',
    })
    daDuyet: boolean;
}
