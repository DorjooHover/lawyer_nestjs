import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type ServiceDocument = Document & Service


@Schema({timestamps: true})
export class Service  {
    @Prop({required: true})
    title: string

    @Prop({type: mongoose.Types.ObjectId || null, ref: "services"})
    parentId?: Service
    @Prop()
    expiredTime: number
    @Prop()
    price: number
    @Prop()
    img?: string

    @Prop()
    description?: string

}

export const ServiceSchema = SchemaFactory.createForClass(Service)