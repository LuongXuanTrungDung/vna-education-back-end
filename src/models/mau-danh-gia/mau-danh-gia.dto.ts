import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MauDanhGiaDto {
    @ApiProperty({
        required: true,
        name: 'tenMau',
        type: String,
        example: 'Mẫu đánh giá gì đó',
        description: 'Tên gọi mẫu đánh giá',
    })
    tenMau: string;

    @ApiPropertyOptional({
        name: 'ghiChu',
        type: String,
        example: 'abcd',
        description: 'Ghi chú về mẫu đánh giá của người tạo',
    })
    ghiChu: string;

    @ApiProperty({
        required: true,
        name: 'tieuChi',
        type: 'array',
        example:
            "[{tenTC: 'abc', moTa: 'abc', mucTieu: [noiDung: 'cba',luaChon: [{'a',1},{'b',2},]]}]",
        description: 'Mẫu đánh giá đặc thù dành cho môn học',
    })
    tieuChi: any[];
}
