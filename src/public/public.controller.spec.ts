import { Test, TestingModule } from '@nestjs/testing';
import { PublicController } from './public.controller';

describe('Auth Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PublicController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PublicController = module.get<PublicController>(PublicController);
    expect(controller).toBeDefined();
  });
});
