import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { UserAccessGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Service, ServiceDocument, User, UserDocument } from 'src/schema';
import { LawyerStatus, UserStatus, UserType } from 'src/utils/enum';
import { Roles } from '../auth/roles.decorator';
import { TimeService } from '../time/time.service';
import { RatingService } from './rating.service';
import { LawyerDto, LocationDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@UseGuards(UserAccessGuard, RoleGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly time: TimeService,
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    private readonly ratingService: RatingService,
  ) {}

  @Put('/:id')
  @ApiParam({ name: 'id' })
  @ApiQuery({ name: 'status' })
  @Roles(UserType.admin)
  async updateUserStatus(
    @Request() { user },
    @Param('id') id: string,
    @Query('status') status: UserStatus,
  ) {
    let updateUser = await this.service.getUserById(id);
    updateUser.userStatus = status;
    updateUser.save();
    return true;
  }

  @Get('me')
  getUser(@Request() { user }) {
    return user;
  }

  @Get('lawyer/location/:id')
  @ApiParam({ name: 'id' })
  async getLawyerLocation(@Param('id') id: string) {
    return (await this.model.findById(id).select('location')).location;
  }

  @Get('user/:id')
  @ApiParam({ name: 'id' })
  async getUserById(@Request() { user }, @Param('id') id) {
    try {
      let user = await this.model.findById(id);
      return user;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Post('/:id')
  @Roles(UserType.user)
  async giveRating(
    @Request() { user },
    @Param('id') id: string,
    @Body() body: { rating: number; message: string },
  ) {
    if (!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED);
    try {
      let lawyer = await this.service.getUserById(id);
      if (!lawyer) return false;

      let createdRating = await this.ratingService.createRating(
        user['_id'],
        body.message ?? '',
        body.rating,
      );
      if (!createdRating) return false;
      let avg =
        lawyer.rating.length > 0
          ? Math.round(
              ((Number(lawyer.ratingAvg) * Number(lawyer.rating.length) +
                Number(body.rating)) /
                (Number(lawyer.rating.length) + 1)) *
                10,
            ) / 10
          : body.rating;
      lawyer.rating.push(createdRating);
      lawyer.ratingAvg = avg;
      lawyer.save();
      return true;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Get('suggest/lawyer')
  async getSuggestedLawyers(@Request() { user }) {
    let lawyers = await this.model
      .find({ userType: UserType.lawyer }, null, { sort: { ratingAvg: -1 } })
      .limit(20);
    return lawyers;
  }

  @Get('suggest/lawyer/:id/:cateId')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'cateId' })
  async getSuggestedLawyersByService(
    @Request() { user },
    @Param('id') id: string,
    @Param('cateId') cateId: string,
  ) {
    let lawyers = await this.model.find(
      {
        userType: UserType.lawyer,
        'userServices.serviceId': { $in: [id, cateId] },
      },
      null,
      { sort: { ratingAvg: -1 } },
    );
    return lawyers;
  }

  @Patch()
  @Roles(UserType.user)
  async updateLawyer(@Request() { user }, @Body() dto: LawyerDto) {
    try {
      let lawyer = await this.model.findByIdAndUpdate(user['_id'], {
        experience: dto.experience,
        education: dto.education,
        degree: dto.degree,
        account: dto.account,
        licenseNumber: dto.licenseNumber,
        location: dto.location,
        certificate: dto.certificate,
        officeLocationString: dto.officeLocationString,
        workLocationString: dto.workLocationString,
        taxNumber: dto.taxNumber,
        workLocation: dto.workLocation,
        officeLocation: dto.officeLocation,
        experiences: dto.experiences,
        userStatus: UserStatus.pending,
        userType: UserType.lawyer,
        registerNumber: dto.registerNumber,
        profileImg: dto.profileImg,
        userServices: dto.userServices,
        email: dto.email,
        phoneNumbers: dto.phoneNumbers,
      });

      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Roles(UserType.lawyer)
  @Patch('location')
  async updateLocation(@Request() { user }, @Body() dto: LocationDto) {
    try {
      user.location = dto;

      user.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @Patch('alert')
  async alertUser(@Request() { user }) {
    try {
      if (user.alert > 0) {
        user.alert = user.alert - 1;
      } else {
        user.userStatus = UserStatus.banned;
      }
      user.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @Delete()
  async deleteUsers() {
    return await this.model.deleteMany();
  }
}
