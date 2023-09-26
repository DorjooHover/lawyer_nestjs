import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

import { UserType } from "src/utils/enum";

export class RegisterDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[89]{1}?[0-9]{7}$/,{
      message: "Утасны дугаар алдаатай байна."
    } )
    phone: string

    @ApiProperty({minLength: 6})
    @IsString()
    @IsNotEmpty()
    password: string


    @ApiProperty({
        enum: UserType,
        default: UserType.user
    })
    userType: UserType;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[89]{1}?[0-9]{7}$/,{
    message: "Утасны дугаар алдаатай байна."
  } )
  phone: string

  @ApiProperty({minLength: 6})
  @IsString()
  @IsNotEmpty()
  password: string
}