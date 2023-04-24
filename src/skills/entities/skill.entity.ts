import { Cv } from "src/cvs/entities/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("skill")
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar"
    })
    designation: string;

    @ManyToMany(type => Cv)
    cvs: Cv[]
}