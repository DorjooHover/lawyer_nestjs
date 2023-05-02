import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class RatingDto {
  @ApiProperty()
  clientId: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  rating: number;
}
export class AccountDto {
  @ApiProperty()
  @IsNumber()
  accountNumber: number
  @ApiProperty()
  @IsString()
  username: string
  @ApiProperty()
  @IsString()
  bank: string
}

export class ExperienceUser {
  @ApiProperty()
  link: string;
  @ApiProperty()
  date: number;
  @ApiProperty()
  title: string;
}
<<<<<<< HEAD
export class LocationDto {
  @ApiProperty()
  @IsNumber()
  lat: number
  @ApiProperty()
  @IsNumber()
  lng: number
=======

export class ServiceTime {
  @ApiProperty()
  day: string;
  @ApiProperty()
  date: number;
  @ApiProperty({ isArray: true })
  time: string[];
}

export class ServiceTypeTime {
  @ApiProperty({
    enum: ServiceType,
  })
  serviceType: ServiceType;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  expiredTime: number;
  @ApiProperty({ isArray: true, type: ServiceTime })
  @IsArray()
  time: ServiceTime[];
}

export class UserServicesDto {
  @ApiProperty({ type: ServiceTypeTime, isArray: true })
  serviceTypes: ServiceTypeTime[];

  @ApiProperty()
  @IsString()
  serviceId: string;
>>>>>>> 6c7cc77e3b7bc54cc6dcc547ac94a30ce81fb2e5
}

export class LawyerDto {

  @ApiProperty()
  @IsString()
  profileImg: string;

  @ApiProperty()
  @IsNumber()
  experience: number;
  
  @ApiProperty()
  @IsString()
  licenseNumber: string
  
  @ApiProperty()
  @IsString()
  certificate: string
  
  @ApiProperty()
  @IsString()
  taxNumber: string

<<<<<<< HEAD
  @ApiProperty({type: AccountDto})
  account: Account

  @ApiProperty({type: LocationDto}) 
  workLocation: LocationDto

  @ApiProperty({type: LocationDto}) 
  officeLocation: LocationDto

  @ApiProperty({type: LocationDto}) 
  location: LocationDto
  
  @ApiProperty({type: ExperienceUser, isArray: true})
  experiences: ExperienceUser[]
  
  @ApiProperty({ type: ExperienceUser, isArray: true })
  education?: ExperienceUser[]

  @ApiProperty({ type: ExperienceUser, isArray: true })
  degree?: ExperienceUser[]
=======
  @ApiProperty({ type: UserServicesDto, isArray: true })
  userServices: UserServicesDto[];

  @ApiProperty({ type: ExperienceUser, isArray: true })
  experiences: ExperienceUser[];
>>>>>>> 6c7cc77e3b7bc54cc6dcc547ac94a30ce81fb2e5
}
