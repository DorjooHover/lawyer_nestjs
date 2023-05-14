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
export class TimeDto {
  
    @ApiProperty()
    @IsNumber()
    expiredTime: number
    @ApiProperty()
    @IsNumber()
    price: number
    
    @ApiProperty()
    service: string
    @ApiProperty({enum: ServiceType, isArray: true}) 
    serviceType: ServiceType[]
    @ApiProperty({type: TimeDetailDto, isArray: true})
    timeDetail: TimeDetailDto[]


}

export class TimesDto {
  @ApiProperty({isArray: true, type: TimeDto})
  times: TimeDto[]
}