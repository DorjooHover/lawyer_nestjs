import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from './config/app.config';
import { AuthModule } from './resourse/auth/auth.module';
import { OrderModule } from './resourse/order/order.module';

import { ServiceModule } from './resourse/service/service.module';
import { TimeModule } from './resourse/time/time.module';
import { UserModule } from './resourse/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(appConfig().dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: appConfig().dbName,
    }),

    UserModule,
    AuthModule,
    ServiceModule,
    OrderModule,

    TimeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
