import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './user.entity';
import {Response} from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user: User, response: Response): Promise<any | { status: number }> {
        return this.validate(user).then((userData) => {
            if (!userData) {
                return { status: 404 };
            }
            let payload = {
                name: userData.name,
                id: userData.id,
            };
            const accessToken = this.jwtService.sign(payload);
            response.cookie('jwt', accessToken, { httpOnly: true });
            return {
                expires_in: 3600,
                access_token: accessToken,
                user_id: userData.id,
                status: 200
            };

        });
    }

    public async register(user: User): Promise<any> {
        return this.userService.create(user)
    }


}
