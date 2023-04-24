import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoEntity from 'src/todo-module/entities/TodoEntity';
import { TodoModuleController } from './todo-module.controller';
import { TodoModuleService } from './todo-module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [TodoEntity]
    )
  ],
  controllers: [TodoModuleController],
  providers: [TodoModuleService]
})
export class TodoModuleModule {}
