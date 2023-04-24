import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/skills/entities/skill.entity';
import { SkillsService } from 'src/skills/skills.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AddSkillCvDto } from './dto/add-skill-cv.dto';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,

    private readonly skillService: SkillsService,
  ) {}

  create(createCvDto: CreateCvDto, user: UserEntity) {
    const newCv = this.cvRepository.create(createCvDto)
    newCv.user = user;
    return this.cvRepository.save(newCv);
  }

  async addSkill(id: string, addSkillDto: AddSkillCvDto) {
    const skill = await this.skillService.findOne(addSkillDto.skillId);
    const cv = await this.cvRepository.findOneBy({id});
    cv.skills.push(skill)
    return this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find()
  }

  findOne(id: string) {
    return this.cvRepository.findOneBy({id})
  }

  update(id: string, updateCvDto: UpdateCvDto) {
    return this.cvRepository.update(id,updateCvDto)
  }

  remove(id: string) {
    return this.cvRepository.delete(id)
  }
}