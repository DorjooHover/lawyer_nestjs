import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ServiceStatus, ServiceType } from 'src/utils/enum';
import { LocationDto } from '../user/user.dto';

export class OrderDto {
  @ApiProperty()
  date: number;

  @ApiProperty()
  @IsString()
  lawyerId: string;
  @ApiProperty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  serviceId: string | null;
  @ApiProperty()
  subServiceId?: string;

  @ApiProperty({type: LocationDto})
  location?: LocationDto;

  @ApiProperty()
  expiredTime: number;
  @ApiProperty({
    enum: ServiceType,
  })
  serviceType: ServiceType;

  @ApiProperty({
    enum: ServiceStatus,
    default: ServiceStatus.pending,
  })
  serviceStatus: ServiceStatus;

  @ApiProperty()
  @IsString()
  channelName: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsString()
  userToken: string;
  @ApiProperty()
  @IsString()
  lawyerToken: string;
}
export class EmergencyOrderDto {
  @ApiProperty()
  date: number;

  @ApiProperty()
  @IsString()
  lawyerId: string ;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  expiredTime: string;
  @ApiProperty({
    enum: ServiceType,
  })
  serviceType: ServiceType;

  @ApiProperty({
    enum: ServiceStatus,
    default: ServiceStatus.pending,
  })
  serviceStatus: ServiceStatus;

  @ApiProperty()
  @IsString()
  channelName: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsString()
  userToken: string;
  @ApiProperty()
  @IsString()
  lawyerToken: string;
  @ApiProperty()
  reason: string;
}
