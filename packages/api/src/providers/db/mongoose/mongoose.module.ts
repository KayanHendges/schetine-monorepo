import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NestMongooseModule.forRoot(process.env.MONGO_HOST, {
      authSource: process.env.MONGO_AUTH_SOURCE,
      auth: {
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
      },
    }),
  ],
})
export class MongooseModule {}
