import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAccessGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { UserType } from 'src/utils/enum';
import { Roles } from '../auth/roles.decorator';
import { TimeDto } from './time.dto';
import { TimeService } from './time.service';
@Controller('time')
@UseGuards(UserAccessGuard, RoleGuard)
@ApiBearerAuth('access-token')
@ApiTags('Time')
export class TimeController {
  constructor(private readonly service: TimeService) {}

  @Post()
  @Roles(UserType.lawyer)
  createTime(@Request() {user} , @Body()  dto: TimeDto) {
    return this.service.createTime(dto, user['_id'])
  }

  @Get('lawyer/:id')
  @ApiParam({name: 'id'})
  getTimeLawyer(@Param('id') id: string) {
    return this.service.getTimeLawyer(id)
  }

  @Get('active/:time')
  @ApiParam({name: 'time'})
  getActive(@Param('time') time: number) {
    return this.service.getActive(time)
  }
  
}