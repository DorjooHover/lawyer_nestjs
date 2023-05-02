import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ServiceType, TimeStatus } from "src/utils/enum";
import { Service } from "./service.schema";
import { User } from "./user.schema";


export type TimeDocument = Document & Time

export class TimeDetail {
  @Prop({type: String,  enum: TimeStatus, default: TimeStatus.active})
  status: TimeStatus
  @Prop()
  time: number
}

@Schema({timestamps: true})
export class Time  {


    @Prop({type: mongoose.Types.ObjectId , ref: "users"})
    lawyer: User
    @Prop()
    expiredTime: number
    @Prop()
    price: number
    
    @Prop({type: mongoose.Types.ObjectId, ref: 'services'})
    service: Service
    @Prop({type: String, enum: ServiceType})
    serviceType: ServiceType
    @Prop([TimeDetail])
    timeDetail: TimeDetail[]

}

export const TimeSchema = SchemaFactory.createForClass(Time)