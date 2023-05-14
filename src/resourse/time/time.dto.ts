import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"
import { ServiceType, TimeStatus } from "src/utils/enum"

export class TimeDetailDto {
  @ApiProperty({enum: TimeStatus}) 
  status: TimeStatus
  @ApiProperty()
  @IsNumber()
  time: number
}

export class TimeTypeDto {
  @ApiProperty({enum: ServiceType}) 
  type: ServiceType
  @ApiProperty()
  price: number
  @ApiProperty()
  expiredTime: number
}
export class TimeDto {
  
    @ApiProperty()
    @IsNumber()
    expiredTime: number
    @ApiProperty()
    @IsNumber()
    price: number
    
    @ApiProperty()
    service: string
    @ApiProperty({type: TimeTypeDto, isArray: true}) 
    serviceType: TimeTypeDto[]
    @ApiProperty({type: TimeDetailDto, isArray: true})
    timeDetail: TimeDetailDto[]


}

export class TimesDto {
  @ApiProperty({isArray: true, type: TimeDto})
  times: TimeDto[]
}