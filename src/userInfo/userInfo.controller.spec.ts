import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from './userInfo.controller';

describe('Auth Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserInfoController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: UserInfoController = module.get<UserInfoController>(UserInfoController);
    expect(controller).toBeDefined();
  });
});
  