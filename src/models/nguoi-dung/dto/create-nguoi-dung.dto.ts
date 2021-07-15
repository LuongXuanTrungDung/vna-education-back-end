import { ApiProperty } from '@nestjs/swagger';

export class CreateNguoiDungDto {
    @ApiProperty({
        name: 'maND',
        type: String,
        required: true,
        example: 'PH420',
        description: 'Mã người dùng, dùng để đăng nhập',
    })
    maND: string;

    @ApiProperty({
        name: 'hoTen',
        type: String,
        required: true,
        example: 'Bành Thị Mẹt',
        description: 'Họ tên của người dùng',
    })
    hoTen: string;

    @ApiProperty({
        name: 'emailND',
        type: String,
        example: 'metbanh96@nullmail.com',
        description: 'Email của người dùng',
    })
    emailND: string;

    @ApiProperty({
        name: 'matKhau',
        type: String,
        required: true,
        example: '20xxxxxxxxxxxxxxxxxxxxxxxxx',
        description: 'Mật khẩu của người dùng, mã hóa trước lưu vào CSDL',
    })
    matKhau: string;

    @ApiProperty({
        name: 'soDienThoai',
        type: String,
        example: '0123 456 7890',
        description: 'Số điện thoại của người dùng',
    })
    soDienThoai: string;

    @ApiProperty({
        name: 'ngaySinh',
        type: String,
        example: '20-4-1996',
        required: true,
        description: 'Ngày sinh của người dùng',
    })
    ngaySinh: string;

    @ApiProperty({
        name: 'noiSinh',
        type: String,
        example: 'Chắt Kdau',
        required: true,
        description: 'Nơi sinh của người dùng',
    })
    noiSinh: string;

    @ApiProperty({
        name: 'soDienThoai',
        type: String,
        example: '13/6/4/13F/2D/5A/6C Cây Mai, P.17, TP. Thủ Đức, TP. HCM',
        required: true,
        description: 'Địa chỉ của người dùng',
    })
    diaChi: string;

    @ApiProperty({
        name: 'gioiTinh',
        required: true,
        type: String,
        enum: ['Nam', 'Nữ', 'Khác'],
        description: 'Giới tính của người dùng',
    })
    gioiTinh: string;

    @ApiProperty({
        name: 'danToc',
        required: true,
        type: String,
        example: 'Sán Dìu',
        description: 'Dân tộc của người dùng',
    })
    danToc: string;

    @ApiProperty({
        name: 'quocTich',
        required: true,
        type: String,
        example: 'Lào',
        default: 'Việt Nam',
        description: 'Quốc tịch của người dùng',
    })
    quocTich: string;

    @ApiProperty({
        name: 'cccd',
        type: String,
        description: 'Chi tiết (mã số) về CCCD của người dùng',
    })
    cccd: string;

    // @ApiProperty({
    //     name: 'hoChieu',
    //     type: 'object',
    //     description: 'Chi tiết về hộ chiếu của người dùng',
    // })
    // hoChieu: string

    @ApiProperty({
        name: 'ngayCap',
        type: String,
        description: 'Ngày cấp CCCD/hoChieu của người dùng',
    })
    ngayCap: string;

    @ApiProperty({
        name: 'noiCap',
        type: String,
        description: 'Nơi cấp CCCD/hộ chiếu của người dùng',
    })
    noiCap: string;

    @ApiProperty({
        name: 'chucVu',
        type: String,
        description: 'Chi tiết về chức vụ của người dùng',
    })
    chucVu: string;

    @ApiProperty({
        name: 'hopDong',
        type: String,
        description: 'Hình thức hợp đồng lao động của người dùng',
    })
    hopDong: string;

    @ApiProperty({
        name: 'tDCM',
        type: String,
        description: 'Trình độ chuyên môn của người dùng',
    })
    tDCM: string;

    @ApiProperty({
        name: 'lopHoc',
        type: String,
        example: '10A4',
        description: 'Lớp học của học sinh',
    })
    lopHoc: string;

    @ApiProperty({
        name: 'ngayNhapHoc',
        type: String,
        example: '21-12-2012',
        description: 'Ngày nhập học của học sinh',
    })
    ngayNhapHoc: string;

    @ApiProperty({
        name: 'dangHoatDong',
        type: Boolean,
        description: 'Trạng thái hoạt động của học sinh/giáo viên',
    })
    dangHoatDong: boolean;

    @ApiProperty({
        name: 'chuNhiem',
        type: String,
        example: '60bxxxxxxxxxxxxx',
        description: 'Lớp học mà giáo viên được giao chủ nhiệm',
    })
    chuNhiem: string;

    @ApiProperty({
        name: 'conCai',
        type: 'array',
        description: 'Con cái của phụ huynh',
    })
    conCai: string[];
}
