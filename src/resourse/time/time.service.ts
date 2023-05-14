import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Time, TimeDocument } from "src/schema";
import { TimeStatus } from "src/utils/enum";
import { TimeDto } from "./time.dto";
@Injectable()
export class TimeService {
  constructor(@InjectModel(Time.name) private model: Model<TimeDocument>) {}

  async createTime(dto: TimeDto, user) {
    try {
      let time = await this.model.findOne({lawyer: user,  service: dto.service})
    
      if(time) {
        return await this.model.findOneAndUpdate({
          lawyer:user,  service: dto.service
        }, {
          timeDetail: dto.timeDetail, 
          serviceType: dto.serviceType
        })
      } else {
        return await this.model.create({
        lawyer: user,
        timeDetail: dto.timeDetail,
    
        service: dto.service,
        serviceType: dto.serviceType
      })
    }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
  
  async getTimeLawyer(id: string) {
    try {
      return await this.model.findOne({lawyer: id, 'timeDetail.status': TimeStatus.active, 'timeDetail.time': {$gte: Date.now() + 1000 * 60 * 30}})
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
  async getTimeService(id: string, type: string) {
    try {
      return await this.model.find({service: id, 'serviceType.type': {$in: [type]}, 'timeDetail.status': TimeStatus.active, 'timeDetail.time': {$gte: Date.now() + 1000 * 60 * 30}})
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
  
async getActive(time: number) {
    try {
      return await this.model.find({
        'timeDetail.status': TimeStatus.active,
        'timeDetail.time': {$gte: time + 1000 * 60 *30},
      })
      // .sort({lawyer.ratingAvg: -1}).limit(1).select('lawyer')
    } catch(error) {
      throw new HttpException(error.message, 500)
    }
  }
}