import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TieuChiDocument = TieuChi & Document;

@Schema({
	timestamps: {
		createdAt: 'thoiDiemTao',
		updatedAt: 'thoiDiemSua',
	},
	versionKey: false,
})
export class TieuChi {
	@ApiProperty({
		required: true,
		type: 'string',
		name: 'maTC',
		description: 'Mã định danh tiêu chí',
	})
	@Prop({ required: true, index: true, unique: true })
	maTC: string;

	@ApiProperty({
		required: true,
		type: 'string',
		name: 'tenTC',
		description: 'Tên tiêu chí',
	})
	@Prop({ required: true })
	tenTC: string;

	@ApiProperty({
		required: true,
		type: 'string',
		name: 'chiTiet',
		description: 'Chi tiết về tiêu chí',
	})
	@Prop({ required: true })
	chiTiet: string;

	@ApiProperty({
		required: true,
		default: 1,
		minimum: 1,
		type: 'number',
		name: 'trongSo',
		description: 'Trọng số của tiêu chí trong đánh giá',
	})
	@Prop({ required: true, default: 1, min: 1 })
	trongSo: number;

	@ApiProperty({
		required: true,
		type: 'array',
		name: 'mucTieu',
		description: 'Các mục tiêu của tiêu chí, chứa maMT',
	})
	@Prop({ required: true })
	mucTieu: string[];

	@ApiProperty({
		type: 'number',
		default: 0,
		minimum: 0,
		maximum: 5,
		name: 'diemTrungBinh',
		description: 'Điểm số trung bình của các mục tiêu',
	})
	@Prop({ required: true, default: 0, min: 0, max: 5 })
	diemTrungBinh: string[];
}

export const TieuChiSchema = SchemaFactory.createForClass(TieuChi);
