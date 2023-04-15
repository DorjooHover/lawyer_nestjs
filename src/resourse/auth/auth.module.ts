import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";

import { MongooseModule } from "@nestjs/mongoose";
import appConfig from "src/config/app.config";

import { User, UserSchema } from "src/schema";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";



@Module({
    imports: [JwtModule.register({
        secretOrPrivateKey: appConfig().appSecret, signOptions: {expiresIn: 60 * 60 * 24}
    }), MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [AuthController],
    providers: [UserService],
    
})

export class AuthModule {}