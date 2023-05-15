import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAccessGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { UserType } from 'src/utils/enum';
import { Roles } from '../auth/roles.decorator';
import { TimeDto } from "./time.dto";
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
  //  return dto.times.map(time => this.service.createTime(time, user['_id']))
    return this.service.createTime(dto, user['_id'])
  }

  @Get('lawyer/:id')
  @ApiParam({name: 'id'})
  getTimeLawyer(@Param('id') id: string) {
    return this.service.getTimeLawyer(id)
  }

  @Get('service/:id/:type')
  @ApiParam({name: 'id'})
  @ApiParam({name: 'type'})
  getTimeService(@Param('id') id: string, @Param('type') type: string) {
    return this.service.getTimeService(id, type)
  }

  @Get('active/:time/:id/:type')
  @ApiParam({name: 'time'})
  @ApiParam({name: 'id'})
  @ApiParam({name: 'type'})
  getActive(@Param('time') time: number, @Param('id') id: string, @Param('type') type: string) {
    return this.service.getActive(time, id, type)
  }
  
}