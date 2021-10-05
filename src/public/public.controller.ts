import { Controller, Post, Body, Param, Get, Res } from '@nestjs/common';

@Controller('public')
export class PublicController {
  @Get('images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }
}
