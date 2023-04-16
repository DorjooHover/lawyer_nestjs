import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ServiceType, UserStatus, UserType } from 'src/utils/enum';
import { Rating } from './rating.schema';
import { Service } from './service.schema';

export type UserDocument = Document & User;

export class ExperienceUser {
  @Prop()
  link: string;
  @Prop()
  date: string;
  @Prop()
  title: string;
}

export class AvailableTime {
  @Prop({ required: true })
  day: string;
  @Prop({ required: true })
  time: string[];
  @Prop({ required: true })
  date: number;
}

export class UserServiceType {
  @Prop({ type: String, enum: ServiceType, required: true })
  serviceType: ServiceType;

  @Prop()
  price: number;

  @Prop()
  expiredTime: number;

  @Prop([AvailableTime])
  time?: AvailableTime[];
}
export class UserServices {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'services' })
  serviceId: Service;
  @Prop([UserServiceType])
  serviceTypes?: UserServiceType[];
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
  experiences?: ExperienceUser[];

  @Prop()
  bio?: String;

  @Prop()
  ratingAvg?: number;

  @Prop()
  rating?: Rating[];

  @Prop()
  profileImg?: String;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.pending,
    required: true,
  })
  userStatus: UserStatus;

  @Prop([UserServices])
  userServices?: UserServices[];
}

export const UserSchema = SchemaFactory.createForClass(User);
