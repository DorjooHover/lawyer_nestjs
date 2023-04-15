import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ServiceType } from 'src/utils/enum';
export class RatingDto {
  @ApiProperty()
  clientId: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  rating: number;
}

export class ExperienceUser  {
  @ApiProperty()
  link: string
  @ApiProperty()
  date: number
  @ApiProperty() 
  title: string
}

export class ServiceTime {
  @ApiProperty()
  day: string
  @ApiProperty()
  date: number
  @ApiProperty({isArray: true})
  time: string[]
}

export class ServiceTypeTime {
  @ApiProperty({
    enum: ServiceType,
    }) 
  serviceType: ServiceType
  @ApiProperty()
  @IsNumber()
  price: number
  @ApiProperty({ isArray: true, type: ServiceTime })
  @IsArray()
  time: ServiceTime[];

}

export class UserServicesDto {


  
  @ApiProperty({type: ServiceTypeTime, isArray: true})
  serviceTypes: ServiceTypeTime[]


  @ApiProperty()
  @IsString()
  serviceId: string;
  

}

export class LawyerDto {
  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  profileImg: string;

  @ApiProperty()
  @IsNumber()
  experience: number;

  @ApiProperty({ type: UserServicesDto, isArray: true })
  userServices: UserServicesDto[]
  
  @ApiProperty({type: ExperienceUser, isArray: true})
  experiences: ExperienceUser[]
}
