import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModuleModule } from './todo-module/todo-module.module';
import { CommonModuleModule } from './common-module/common-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoEntity from './todo-module/entities/TodoEntity';
import { AuthentificationMiddleware } from './authentication/authentication.middleware';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CvsModule } from './cvs/cvs.module';
import { SkillsModule } from './skills/skills.module';
import { UserEntity } from './users/entities/user.entity';
import { Cv } from './cvs/entities/cv.entity';
import { Skill } from './skills/entities/skill.entity';

@Module({
  imports: [
    TodoModuleModule,
    CommonModuleModule,
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      username: "root",
      password: "",
      database: "tpweb",
      entities: [TodoEntity, UserEntity, Cv, Skill],
      synchronize: true,
      charset: "utf8_general_ci",
    }),
    UsersModule,
    CvsModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthentificationMiddleware)
      .forRoutes(
        "todo",
        "v2/todo",
        "cvs",
        "skills",
        "users",
      )
  }

}