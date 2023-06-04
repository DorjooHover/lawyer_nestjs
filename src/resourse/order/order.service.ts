import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Order, OrderDocument, User, UserDocument } from 'src/schema';
import { LawyerStatus, ServiceStatus, ServiceType } from 'src/utils/enum';
import { EmergencyOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private model: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async updateLawyerStatus(
    id: string,
    status: LawyerStatus,
    orderId: string,
    orderStatus: ServiceStatus,
  ) {
    try {
      await this.userModel.findByIdAndUpdate(id, {
        $addToSet: { status: status },
      });
      return await this.updateOrderStatus(orderId, orderStatus);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async createEmergencyOrder(dto: EmergencyOrderDto) {
    try {
      let lawyerId =
        dto.serviceType == ServiceType.onlineEmergency
          ? null
          : new mongoose.mongo.ObjectId(dto.lawyerId);

      let order = await this.model.create({
        client: dto.userId,
        date: dto.date,
        lawyer: lawyerId,
        location: dto.location,
        expiredTime: dto.expiredTime,
        serviceStatus: dto.serviceStatus,
        reason: dto.reason,
        serviceId: 'any',
        serviceType: dto.serviceType,
        userToken: dto.userToken,
        price: dto.price,
        lawyerToken: dto.lawyerToken,
        channelName: dto.channelName,
      });
      let user = await this.userModel.findById(order.client);
      return { user, order };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getUserOrders(user: any) {
    try {
      let date = Date.now() - 60 * 60 * 1000;
      let orders = await this.model
        .find({
          $and: [
            {
              $or: [
                { lawyer: user.userType == 'our' ? null : user['_id'] },
                { client: user['_id'] },
              ],
            },
            {
              $or: [
                { serviceStatus: ServiceStatus.active },
                { serviceStatus: ServiceStatus.pending },
              ],
            },
            { date: { $gte: date } },
          ],
        })
        .populate('client', 'firstName lastName phone ', this.userModel)
        .populate(
          'lawyer',
          'firstName lastName phone profileImg',
          this.userModel,
        );

      return orders;
    } catch (error) {
      console.error(error);
      throw new HttpException('error', 500);
    }
  }

  async getOrderById(id: string) {
    try {
      let orders = await this.model
        .findById(id)
        .populate('client', 'firstName lastName phone ', this.userModel)
        .populate(
          'lawyer',
          'firstName lastName phone profileImg',
          this.userModel,
        );

      return orders;
    } catch (error) {
      console.error(error);
      throw new HttpException('error', 500);
    }
  }

  async checkOrders() {
    try {
      return await '';
    } catch (err) {
      throw new HttpException('err', 500);
    }
  }

  async updateOrderStatus(id: string, status: ServiceStatus) {
    try {
      let order = await this.model.updateOne(
        { _id: id },
        { $set: { serviceStatus: status } },
      );

      if (!order) return status;

      return true;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
