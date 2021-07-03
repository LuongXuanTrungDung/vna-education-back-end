import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NguoiDung } from "../../nguoi-dung/nguoi-dung.entity";

export class CreateMonHocDto {
	@ApiProperty({
		required: true,
		type: String,
		name: 'tenMH',
		example: 'Sinh học 8',
		description: 'Tên gọi của môn học, bao gồm cả khối lớp'
	})
	tenMH: string;

	@ApiProperty({
		required: true,
		type: Number,
		name: 'soTiet',
		default: 0, minimum: 0,
		example: 12,
		description: 'Số tiết dự kiến để hoàn tất môn học'
	})
    soTiet: number;


	@ApiPropertyOptional({
		type: String,
		name: 'moTa',
		description: 'Mô tả về môn học'
	})
	moTa: string;

    @ApiProperty({
		type: 'array',
		required: true,
		name: 'giaoVien',
		description: 'Danh sách các giáo viên dạy môn học'
	})
    giaoVien: NguoiDung[];
}
