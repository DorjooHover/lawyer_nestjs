import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ServiceStatus, ServiceType } from "src/utils/enum";
import { Service } from "./service.schema";
import { User } from "./user.schema";


export type OrderDocument = Document & Order


@Schema({timestamps: true})
export class Order  {
    @Prop({required: true})
    date: number

    @Prop({type: mongoose.Types.ObjectId, ref: "users"})
    clientId: User | null

    @Prop({type: mongoose.Types.ObjectId, ref: "users"})
    lawyerId: User

    @Prop({type: mongoose.Types.ObjectId, ref: "users"})
    serviceId: Service | null

    @Prop()
    location?: string

    @Prop()
    expiredTime: string

    @Prop({ type: String, enum: ServiceType,   required: true })
    serviceType: ServiceType

    @Prop({ type: String, enum: ServiceStatus ,  required: true })
    serviceStatus: ServiceStatus

    @Prop({required: true})
    channelName: string

    @Prop({required: true})
    price: string
    
    @Prop({required: true})
    userToken: string
    @Prop({required: true})
    lawyerToken: string

    @Prop()
    reason: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)