import { ApiProperty } from "@nestjs/swagger";

export class ServiceDto {
  @ApiProperty()

  title: string
  @ApiProperty()

  img: string
  @ApiProperty()

  price: number
  @ApiProperty()
  expiredTime: number
  @ApiProperty()

  parentId: string
  @ApiProperty()

  description: string
}