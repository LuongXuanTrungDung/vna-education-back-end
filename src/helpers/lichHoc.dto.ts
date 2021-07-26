import { ApiProperty } from '@nestjs/swagger';

class TietHocRes {
    @ApiProperty({
        name: 'idTiet',
        description: '_id của tiết học',
        type: String,
        example: '70x9999999999x1',
    })
    id: string;

    @ApiProperty({
        name: 'thuTiet',
        description: 'Thứ tự tiết trong ngày',
        type: String,
        example: 'Tiết High',
    })
    thuTiet: string;

    @ApiProperty({
        name: 'thoiGian',
        description: 'Thời gian bắt đầu tiết học',
        type: String,
        example: '4h20',
    })
    thoiGian: string;

    @ApiProperty({
        name: 'giaoVien',
        description: 'Giáo viên đứng lớp trong tiết',
        type: String,
        example: 'Snoop Doge',
    })
    giaoVien: string;

    @ApiProperty({
        name: 'monHoc',
        description: 'Môn học được dạy trong tiết',
        type: String,
        example: 'Sinh học',
    })
    monHoc: string;
}

class BuoiHocRes {
    @ApiProperty({
        name: 'idBuoi',
        description: '_id của buổi học',
        type: String,
        example: '70x9999999999x1',
    })
    id: string;

    @ApiProperty({
        name: 'thuTuan',
        description: 'Thứ trong tuần',
        type: String,
        example: 'Thứ High',
    })
    thu: string;

    @ApiProperty({
        name: 'ngayHoc',
        description: 'Ngày học trong tuần',
        type: String,
        example: '19-7-2021',
    })
    ngayHoc: string;

    tietHoc: TietHocRes[];
}

export class LichHocDTO {
    @ApiProperty({
        name: 'idTuan',
        description: '_id của tuần học',
        type: String,
        example: '70x9999999999x1',
    })
    id: string;

    @ApiProperty({
        name: 'soTuan',
        description: 'Số thứ tự của tuần trong năm học',
        type: Number,
        example: '420',
    })
    soTuan: number;

    @ApiProperty({
        name: 'tenTuan',
        description: 'Tên gọi của tuần trong năm học',
        type: String,
        example: 'Tuần 420',
    })
    tenTuan: string;

    @ApiProperty({
        name: 'ngayBatDau',
        description: 'Ngày bắt đầu tuần học',
        type: String,
        example: '20/4/2021',
    })
    ngayBatDau: string;

    @ApiProperty({
        name: 'ngayKetThuc',
        description: 'Ngày kết thúc tuần học',
        type: String,
        example: '20/4/2021',
    })
    ngayKetThuc: string;

    @ApiProperty({
        name: 'hocKy',
        description: 'Học kỳ chứa tuần học',
        type: Number,
        example: '420',
    })
    hocKy: number;

    @ApiProperty({
        name: 'lopHoc',
        description: 'Lớp học cần cho hiện lịch học',
        type: String,
        example: 'A20',
    })
    lopHoc: string;

    buoiHoc: BuoiHocRes[];
}
