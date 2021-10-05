import { Controller, Post, Body, Param, Get, Res, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../auth/user.service';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtService } from "@nestjs/jwt";
import { extname } from 'path';
import { Response, Request } from 'express';

@Controller('api')
export class UserInfoController {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  @Get('me')
  async me(@Req() request: Request): Promise<any> {
    try {
      const temp = request.headers.cookie;
      const cookie = temp.replace("jwt=","")
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findById(data['id']);
      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  
  @Post(':userid/upload')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  ))

  async uploadAvatar(@Param('userid') userId, @UploadedFile() file, @Req() request: Request) {
    try {
      const temp = request.headers.cookie;
      const cookie = temp.replace("jwt=","")
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }      
      this.userService.setAvatar(Number(userId), `${file.path}`);
      return {
        filePath: file.path,
        status: 200
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
