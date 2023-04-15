import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { UserAccessGuard } from "src/guard/auth.guard";
import { Service, ServiceDocument } from "src/schema";
import { ServiceDto } from "./service.dto";

@Controller('service')
@ApiTags('Services')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class ServiceController {
  constructor(  @InjectModel(Service.name) private model: Model<ServiceDocument>) {}

  
  @Post()
  async createService(@Request() {user}, @Body() dto: ServiceDto) {
    try {
      let service = await this.model.findOne({title: dto.title})
      if(service) throw new HttpException('created service', HttpStatus.FOUND)
      service = await this.model.create({
        title : dto.title,
        img: dto.img,
        description: dto.description,
        parentId: dto.parentId,
        price: dto.price,
        expiredTime: dto.expiredTime
      })
      return service
    } catch (error) {
      throw new HttpException(error, 500)
    }
  } 
  @Get()
  async allServices(@Request() {user}) {
    try {
      let services = await this.model.find({parentId: {$eq: "false"}})
      return services
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  @Get("/:id")
  @ApiParam({name: 'id'})
  async getServiceByParentId(@Request() {user}, @Param('id') id: string) {
    try {
      let service = await this.model.find({parentId: id} ).populate('parentId', 'title _id', this.model )
      return service
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }




  @Put("/:id")
  @ApiParam({name: 'id'})
  async updateServiceById(@Request() {user}, @Param('id') id: string, @Body() dto: ServiceDto) {
    try {
      let service = await this.model.findByIdAndUpdate(id, {
        title: dto.title,
        parentId: dto.parentId,
        description: dto.description,
        img: dto.img,
        price: dto.price,
        expiredTime: dto.expiredTime
      })
      if(!service) return false
      return true
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  @Delete("/:id")
  @ApiParam({name: 'id'})
  async deleteById(@Request() {user}, @Param('id') id: string) {
    try {
      let service = await this.model.findByIdAndDelete(id)
      if(!service) return false
      return true
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}