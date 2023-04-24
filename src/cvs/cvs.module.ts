import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  controllers: [CvsController],
  providers: [CvsService],
  imports: [
    TypeOrmModule.forFeature(
      [Cv]
    ),
    SkillsModule
  ]
})
export class CvsModule {}