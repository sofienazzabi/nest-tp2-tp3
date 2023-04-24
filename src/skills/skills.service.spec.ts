import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository : Repository<Skill>
  ) {}

  create(createSkillDto: CreateSkillDto) {
    const skill = this.skillRepository.create(createSkillDto)
    return this.skillRepository.save(skill)
  }

  findAll() {
    return  this.skillRepository.find();
  }

  findOne(id: string) {
    return  this.skillRepository.findOneBy({id});
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return  this.skillRepository.update(id, updateSkillDto);
  }

  remove(id: string) {
    return  this.skillRepository.delete(id);
  }
}