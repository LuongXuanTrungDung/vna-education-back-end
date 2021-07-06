import { ApiProperty } from '@nestjs/swagger';

export class DangNhapDTO {
    @ApiProperty({
        name: 'username',
        description: 'Mã người dùng, dùng để đăng nhập',
        type: String,
        example: 'PH420',
    })
    username: string;

    @ApiProperty({
        name: 'password',
        description: 'Mật khẩu đăng nhập',
        type: String,
        example: '123456',
    })
    password: string;
}

export class KetQua_DangNhap {
    @ApiProperty({
        name: 'id',
        description: '_id của người dùng vừa đăng nhập trong CSDL',
        type: String,
        example: '60bxxxxxxxxxxxxxxxxxxxxx',
    })
    id: string;

    @ApiProperty({
        name: 'resOk',
        description: 'Trạng thái đăng nhập',
        type: Boolean,
    })
    resOk: boolean;
}
