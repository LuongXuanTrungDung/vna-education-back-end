import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
	timestamps: {
		createdAt: 'thoiDiemTao',
		updatedAt: 'thoiDiemSua',
	},
	versionKey: false,
})
export class TieuChi {
	@Prop({ required: true })
	tenTC: string;

	@Prop() noiDung: string;

	@Prop({
		required: true,
		type: [
			{
				type: {
					id: Number,
					noiDung: String
				}
			}
		]
	})
	mucTieu: {
		id: number,
		noiDung: string
	}[]
}

export const TieuChiSchema = SchemaFactory.createForClass(TieuChi);
