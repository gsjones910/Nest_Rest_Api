import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth/auth.controller';
import { UserInfoController } from '../userInfo/userInfo.controller';
import { PublicController } from '../public/public.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: "admin",
        })
    ],
    providers: [UserService, AuthService],
    controllers: [AuthController, UserInfoController, PublicController]
})
export class AuthModule { }
