import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserStatus, UserType } from "src/utils/enum";
import { Rating } from "./rating.schema";
import { Service } from "./service.schema";

export type UserDocument = Document & User;

export class Location {
  lat: number
  lng: number
}

export class ExperienceUser  {
  @Prop()
  link: string;
  @Prop()
  date: string
  @Prop() 
  title: string
}

export class Account {
  @Prop()
  accountNumber: number
  @Prop()
  username: string
  @Prop()
  bank: string
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  
  @Prop({ required: true })
  phone: string;
  
  @Prop({ required: true })
  password: string;
  
  @Prop()
  registerNumber: string;

  @Prop({
    type: String,
    enum: UserType,
    default: UserType.user,
    required: true,
  })
  userType: UserType;

  @Prop()
  experience?: number;

    @Prop()
    experiences?: ExperienceUser[]

    @Prop()
    education?: ExperienceUser[]

    @Prop()
    degree?: ExperienceUser[]

    @Prop() 
    licenseNumber?: string

    @Prop() 
    certificate?: string

    @Prop()
    taxNumber?: string

    @Prop({type: Account})
    account?: Account

    @Prop({type: Location}) 
    workLocation?: Location

    @Prop({type: Location}) 
    officeLocation?: Location

    @Prop({type: Location}) 
    location?: Location

  @Prop()
  bio?: String;

  @Prop()
  ratingAvg?: number;

  @Prop()
  rating?: Rating[];

  @Prop({ type: String, enum: UserStatus, default: UserStatus.pending, required: true })
  userStatus: UserStatus;

  @Prop({default: 3})
  alert: number

  @Prop()
  userServices?: Service[];

  @Prop()
  profileImg?: string;

  @Prop()
  phoneNumbers?: string[];
  @Prop()
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
