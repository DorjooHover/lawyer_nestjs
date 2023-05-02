import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Time, TimeSchema } from "src/schema";
import { TimeController } from "./time.controller";
import { TimeService } from "./time.service";

@Module({
  imports: [MongooseModule.forFeature([{name: Time.name, schema: TimeSchema}])],
  controllers: [TimeController],
  providers: [TimeService]
})
export class TimeModule {}