import { Test, TestingModule } from '@nestjs/testing';
import { TodoModuleService } from './todo-module.service';

describe('TodoModuleService', () => {
  let service: TodoModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoModuleService],
    }).compile();

    service = module.get<TodoModuleService>(TodoModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
