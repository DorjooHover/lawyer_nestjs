import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import appConfig from 'src/config/app.config';

import { User, UserDocument } from 'src/schema/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async signPayload(payload) {
    return sign({ name: payload }, appConfig().appSecret, {
      expiresIn: 60 * 60 * 24 * 7,
    });
  }
  async validateUser(payload: string) {
    return await this.model.findOne({ phone: payload });
  }

  async getUserById(id: string) {
    try {
      return await this.model.findById(id)
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

}
