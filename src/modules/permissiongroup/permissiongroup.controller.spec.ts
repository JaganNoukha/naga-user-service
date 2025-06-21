import { Test, TestingModule } from '@nestjs/testing';
import { PermissionGroupController } from './permissiongroup.controller';

describe('PermissionGroupController', () => {
  let controller: PermissionGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionGroupController],
    }).compile();

    controller = module.get<PermissionGroupController>(PermissionGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
