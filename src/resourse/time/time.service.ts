import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Time, TimeDocument } from 'src/schema';
import { TimeStatus } from 'src/utils/enum';
import { TimeDto } from './time.dto';
@Injectable()
export class TimeService {
  constructor(@InjectModel(Time.name) private model: Model<TimeDocument>) {}

  async createTime(dto: TimeDto, user) {
    try {
      let time = await this.model.findOne({
        lawyer: user,
        service: dto.service,
      });

      if (time) {
        return await this.model.findOneAndUpdate(
          {
            lawyer: user,
            service: dto.service,
          },
          {
            timeDetail: dto.timeDetail,
            serviceType: dto.serviceType,
          },
        );
      } else {
        return await this.model.create({
          lawyer: user,
          timeDetail: dto.timeDetail,

          service: dto.service,
          serviceType: dto.serviceType,
        });
      }
    } catch (error) {
      throw new HttpException('Алдаа гарлаа.', 500);
    }
  }

  async getTimeLawyer(id: string) {
    try {
      let lawyer = new mongoose.Types.ObjectId(id);
      return await this.model.findOne({
        lawyer: lawyer,
        'timeDetail.status': TimeStatus.active,
        'timeDetail.time': { $lte: Date.now() + 1000 * 60 * 30 },
      });
  } catch (error) {
    throw new HttpException('Алдаа гарлаа.', 500);
    }
  }
  async getTimeService(id: string, type: string) {
    try {
      return await this.model.find({
        service: id,
        'serviceType.type': { $in: [type] },
        'timeDetail.status': TimeStatus.active,
        'timeDetail.time': { $gte: Date.now() + 1000 * 60 * 30 },
      });
    } catch (error) {
      throw new HttpException('Алдаа гарлаа.', 500);
    }
  }

  async getActive(time: number, id: string, type: string, isActive: boolean) {
    try {
      return await this.model.find({
        service: id == 'any' ? { $ne: null } : id,
        'serviceType.type': { $in: [type] },
        'timeDetail.status': TimeStatus.active,
        'timeDetail.time': isActive
          ? { $gte: Number.parseInt(time.toString()) + 1000 * 60 * 30 }
          : Number.parseInt(time.toString()),
      });
      // .sort({lawyer.ratingAvg: -1}).limit(1).select('lawyer')
    } catch (error) {
      throw new HttpException('Алдаа гарлаа.', 500);
    }
  }

  async updateTimeStatus() {
    
  }
}
