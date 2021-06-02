import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type NguoiDungDocument = NguoiDung & Document;

@Schema({
    timestamps: {
        createdAt: 'thoiDiemTao',
        updatedAt: 'thoiDiemSua',
    },
    versionKey: false,
})
export class NguoiDung {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'maND',
        description: 'Mã người dùng, dùng để đăng nhập như username',
    })
    @Prop({ required: true, index: true, unique: true })
    maND: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'vaiTro',
        enum: ['Học sinh', 'Giáo viên', 'Phụ huynh', 'Quản trị viên'],
        default: 'Học sinh',
        description: 'Vai trò của người dùng',
    })
    @Prop({
        required: true,
        enum: ['Học sinh', 'Giáo viên', 'Phụ huynh', 'Quản trị viên'],
        default: 'Học sinh',
    })
    vaiTro: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'hoTen',
        description: 'Họ tên đầy đủ của người dùng',
    })
    @Prop({ required: true })
    hoTen: string;

    @ApiProperty({
        type: 'string',
        name: 'emailND',
        description: 'Email của người dùng',
    })
    @Prop()
    emailND: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'matKhau',
        description: 'Mật khẩu, dùng để đăng nhập',
    })
    @Prop({ required: true })
    matKhau: string;

    @ApiProperty({
        type: 'string',
        name: 'soDienThoai',
        description: 'Số điện thoại của người dùng',
    })
    @Prop()
    soDienThoai: string;

    @ApiProperty({
        required: true,
        type: 'Date',
        name: 'ngaySinh',
        description: 'Ngày sinh của người dùng',
    })
    @Prop({ required: true })
    ngaySinh: Date;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'diaChi',
        description: 'Địa chỉ của người dùng',
    })
    @Prop({ required: true })
    diaChi: string;

    @ApiProperty({
        required: true,
        enum: ['Nam', 'Nữ', 'Khác'],
        type: 'string',
        name: 'gioiTinh',
        description: 'Giới tính của người dùng',
    })
    @Prop({ required: true, enum: ['Nam', 'Nữ', 'Khác'] })
    gioiTinh: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'danToc',
        description: 'Dân tộc của người dùng',
    })
    @Prop({ required: true })
    danToc: string;

    @ApiPropertyOptional({
        type: 'string',
        name: 'cccd',
        description: 'Số căn cước công dân',
    })
    @Prop()
    cccd: string;

    @ApiPropertyOptional({
        type: 'string',
        name: 'hoChieu',
        description: 'Mã số hộ chiếu',
    })
    @Prop()
    hoChieu: string;

    @ApiPropertyOptional({
        type: 'string',
        name: 'noiCap',
        description: 'Nơi cấp căn cước công dân hoặc hộ chiếu',
    })
    @Prop()
    noiCap: string;

    @ApiPropertyOptional({
        type: 'string',
        name: 'cccd',
        description: 'Ngày cấp căn cước công dân hoặc hộ chiếu',
    })
    @Prop()
    ngayCap: Date;

    @ApiPropertyOptional({
        type: 'array',
        name: 'conCai',
        description: 'Con cái của người dùng là phụ huynh',
    })
    @Prop()
    conCai: string[];
}

export const NguoiDungSchema = SchemaFactory.createForClass(NguoiDung);
