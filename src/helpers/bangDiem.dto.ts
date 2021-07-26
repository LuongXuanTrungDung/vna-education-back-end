import { ApiProperty } from '@nestjs/swagger';

class HKTong {
    @ApiProperty({
        name: 'hocLuc',
        type: String,
        description: 'Xếp loại học lực',
        example: 'Tạm',
    })
    hocLuc: string;

    @ApiProperty({
        name: 'hanhKiem',
        type: String,
        description: 'Xếp loại hạnh kiểm',
        example: 'Tạm',
    })
    hanhKiem: string;

    @ApiProperty({
        name: 'diemTB',
        type: Number,
        default: 0,
        minimum: 0,
        maximum: 10,
        description: 'Điểm trung bình các môn',
        example: 5,
    })
    diemTB: number;
}

class HKMon {
    @ApiProperty({
        name: 'kiemTra_mieng',
        description: 'Điểm kiểm tra miệng',
        type: [Number],
        example: '[3,5,1]',
    })
    kiemTra_mieng: number[];

    @ApiProperty({
        name: 'kiemTra_15phut',
        description: 'Điểm kiểm tra 15 phút',
        type: [Number],
        example: '[3,5,1]',
    })
    kiemTra_15phut: number[];

    @ApiProperty({
        name: 'kiemTra_1tiet',
        description: 'Điểm kiểm tra 1 tiết',
        type: [Number],
        example: '[3,5,1]',
    })
    kiemTra_1tiet: number[];

    @ApiProperty({
        name: 'thiHK',
        type: Number,
        description: 'Điểm thi học kì',
        example: 5.5,
        minimum: 0,
        default: 0,
        maximum: 10,
    })
    thiHK: number;

    @ApiProperty({
        name: 'diemTong',
        type: Number,
        description: 'Điểm trung bình học kỳ',
        example: 5.5,
        minimum: 0,
        default: 0,
        maximum: 10,
    })
    diemTong: number;
}

class BDMon {
    @ApiProperty({
        name: 'id',
        type: String,
        description: '_id của bảng điểm môn trong CSDL',
        example: '420x420x420333333333',
    })
    id: string;

    @ApiProperty({
        name: 'giaoVien',
        type: String,
        description: 'Họ tên giáo viên bộ môn',
        example: 'Văn Ba',
    })
    giaoVien: string;

    @ApiProperty({
        name: 'monHoc',
        type: String,
        description: 'Môn học',
        example: 'Bắn súng hơi cự ly 20m',
    })
    monHoc: string;

    hocKy1: HKMon;
    hocKy2: HKMon;

    @ApiProperty({
        name: 'diemTB',
        type: Number,
        description: 'Điểm trung bình cả năm của môn',
        example: 5.5,
        minimum: 0,
        default: 0,
        maximum: 10,
    })
    diemTB: number;

    @ApiProperty({
        name: 'nhanXet',
        type: String,
        description: 'Nhận xét của giáo viên bộ môn',
        example: 'Kệ',
    })
    nhanXet: string;
}

export class BangDiemRes {
    @ApiProperty({
        name: 'hocSinh',
        type: String,
        description: 'Họ tên học sinh',
        example: 'Thúc Sinh',
    })
    hocSinh: string;

    @ApiProperty({
        name: 'lopHoc',
        type: String,
        description: 'Lớp học của học sinh',
        example: '12A3',
    })
    lopHoc: string;

    @ApiProperty({
        name: 'GVCN',
        type: String,
        description: 'GVCN của lớp học sinh',
        example: 'Hàng Thịt',
    })
    GVCN: string;

    hocKy1: HKTong;
    hocKy2: HKTong;
    caNam: HKTong;

    @ApiProperty({
        name: 'xepLoai',
        type: String,
        description: 'Xếp loại cuối năm của học sinh',
        example: 'Ừa',
    })
    xepLoai: string;

    @ApiProperty({
        name: 'nhanXet',
        type: String,
        description: 'Nhận xét của GVCN về học sinh',
        example: 'Lên lớp cho rồi',
    })
    nhanXet: string;

    bangDiemMon: BDMon[];
}
