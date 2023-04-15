import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";

import { MongooseModule } from "@nestjs/mongoose";
import appConfig from "src/config/app.config";

import {  Service, ServiceSchema, User, UserSchema } from "src/schema";
import { Rating, RatingSchema } from "src/schema/rating.schema";
import { RatingService } from "./rating.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Global()
@Module({
    imports: [JwtModule.register({
        secretOrPrivateKey: appConfig().appSecret, signOptions: {expiresIn: 60 * 60 * 24}
    }), MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Rating.name, schema: RatingSchema,},   {name: Service.name, schema: ServiceSchema}])],
    controllers: [UserController],
    providers: [UserService, RatingService],
    exports: [UserService]
})

export class UserModule {}