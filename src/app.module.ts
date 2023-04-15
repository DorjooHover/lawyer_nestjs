import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsSdkModule } from 'nest-aws-sdk';
import appConfig from './config/app.config';
import { AuthModule } from './resourse/auth/auth.module';
import { AwsModule } from './resourse/aws/aws.module';
import { OrderModule } from './resourse/order/order.module';

import { ServiceModule } from './resourse/service/service.module';
import { UserModule } from './resourse/user/user.module';
@Module({
  imports: 
  
  [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),

    MongooseModule.forRoot( appConfig().dbUrl, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: appConfig().dbName
    }),

    UserModule, AuthModule, ServiceModule, OrderModule,     AwsModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          credentials: { accessKeyId:"AKIA5QUH5LKTLFDISYOM", secretAccessKey: "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" },
          region: appConfig().awsRegion,
          
        }
      }
    })
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
