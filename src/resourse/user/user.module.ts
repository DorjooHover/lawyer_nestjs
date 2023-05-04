import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";

import { MongooseModule } from "@nestjs/mongoose";
import appConfig from "src/config/app.config";

import { Rating, RatingSchema, Service, ServiceSchema, Time, TimeSchema, User, UserSchema } from "src/schema";

import { TimeService } from "../time/time.service";
import { RatingService } from "./rating.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Global()
@Module({
    imports: [JwtModule.register({
        secretOrPrivateKey: appConfig().appSecret, signOptions: {expiresIn: 60 * 60 * 24}
}), MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Rating.name, schema: RatingSchema,},   {name: Service.name, schema: ServiceSchema}, {name: Time.name, schema: TimeSchema}])],
    controllers: [UserController],
    providers: [UserService, RatingService, TimeService],
    exports: [UserService]
})

export class UserModule {}