import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, User, UserDocument } from 'src/schema';
import { ServiceStatus } from 'src/utils/enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private model: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserOrders(id: string) {
    try {
      let date = Date.now() - 60 * 60 * 1000;
      let orders = await this.model
        .find({
          $and: [
            { $or: [{ lawyerId: id }, { clientId: id }] },
            {
              $or: [
                { serviceStatus: ServiceStatus.active },
                { serviceStatus: ServiceStatus.pending },
              ],
            },
            { date: { $gte: date } },
          ],
        })
        .populate('clientId', 'firstName lastName phone ', this.userModel)
        .populate(
          'lawyerId',
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
        .populate('clientId', 'firstName lastName phone ', this.userModel)
        .populate(
          'lawyerId',
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

      if (!order) return false;

      return true;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
