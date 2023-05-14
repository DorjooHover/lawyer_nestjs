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

export class TimeType {
  @Prop({type: String, enum: ServiceType})
  type: ServiceType
  @Prop()
  price: number
  @Prop()
  expiredTime: number
}

@Schema({timestamps: true})
export class Time  {


    @Prop({type: mongoose.Types.ObjectId , ref: "users"})
    lawyer: User
    @Prop()
  
    @Prop({type: mongoose.Types.ObjectId, ref: 'services'})
    service: Service
    @Prop([TimeType])
    serviceType: TimeType[]
    @Prop([TimeDetail])
    timeDetail: TimeDetail[]

}

export const TimeSchema = SchemaFactory.createForClass(Time)