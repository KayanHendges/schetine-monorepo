import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_HOST, {
            authSource: process.env.MONGO_AUTH_SOURCE,
            auth: {
                username: process.env.MONGO_USERNAME,
                password: process.env.MONGO_PASSWORD,
            }
        })
    ]
})