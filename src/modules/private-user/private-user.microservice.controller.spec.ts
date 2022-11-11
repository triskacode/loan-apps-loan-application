import { Test, TestingModule } from '@nestjs/testing';
import { PrivateUserMicroserviceController } from './private-user.microservice.controller';

describe('PrivateUserMicroserviceController', () => {
  let controller: PrivateUserMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateUserMicroserviceController],
    }).compile();

    controller = module.get<PrivateUserMicroserviceController>(PrivateUserMicroserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
