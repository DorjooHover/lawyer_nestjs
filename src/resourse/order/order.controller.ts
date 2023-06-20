import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import mongoose, { Model } from 'mongoose';
import { UserAccessGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Order, OrderDocument } from 'src/schema';
import { ServiceStatus, UserType } from 'src/utils/enum';
import { Roles } from '../auth/roles.decorator';
import { EmergencyOrderDto, OrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Orders')
@UseGuards(UserAccessGuard, RoleGuard)
@ApiBearerAuth('access-token')
export class OrderController {
  constructor(
    private readonly service: OrderService,
    @InjectModel(Order.name) private model: Model<OrderDocument>,
  ) {}

  @Post('')
  async createOrder(@Request() { user }, @Body() dto: OrderDto) {
    try {
      let lawyerId = new mongoose.mongo.ObjectId(dto.lawyerId);
      let serviceId = new mongoose.mongo.ObjectId(dto.serviceId);
      let order = await this.model.create({
        client: user['_id'],
        date: dto.date,
        lawyer: lawyerId,
        location: dto.location,
        serviceId: serviceId,
        subServiceId: dto.subServiceId,
        expiredTime: dto.expiredTime,
        serviceStatus: dto.serviceStatus,
        serviceType: dto.serviceType,
        userToken: dto.userToken,
        price: dto.price,
        lawyerToken: dto.lawyerToken,
        channelName: dto.channelName,
      });
      return order;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Post('emergency')
  async createEmergencyOrder(
    @Request() { user },
    @Body() dto: EmergencyOrderDto,
  ) {
    dto.userId = user['_id'];
    return this.service.createEmergencyOrder(dto);
  }

  @Post('token/:id/:channelName/:isLawyer')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'channelName' })
  @ApiParam({ name: 'isLawyer' })

  async setOrderTokenUser(
    @Request() { user },
    @Param('id') id: string,
    @Param('channelName') channelName: string,
    @Param('isLawyer') isLawyer: string,
    @Body() token: {token: string} 
  ) {
    try {
      let order = await this.model.findById(id);
      order.channelName = channelName;
      isLawyer == 'true' ? order.lawyerToken = token.token : order.userToken = token.token;
      await order.save();
      return await this.service.getOrderById(order['_id']);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }


  @Get('user/:id')
  @ApiParam({ name: 'id' })
  getOrderById(@Param('id') id: string) {
    return this.service.getOrderById(id);
  }
  @Roles(UserType.admin)
  @Get()
  async allOrders(@Request() { user }) {
    return await this.model.find();
  }

  @Get('user')
  getUserOrders(@Request() { user }) {
    return this.service.getUserOrders(user);
  }

  @Put('/:id/:status')
  @ApiParam({ name: 'id' })
  @ApiQuery({ name: 'status' })
  updateOrderStatus(
    @Request() { user },
    @Param('id') id: string,
    @Query('status') status: ServiceStatus,
  ) {
    return this.service.updateOrderStatus(id, status);
  }

  @Delete()
  async deleteAllOrders() {
    return await this.model.deleteMany();
  }
}
