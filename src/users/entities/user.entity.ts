import { Cv } from "src/cvs/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar"
    })
    username: string;

    @Column({
        type: "varchar"
    })
    email: string;

    @Column({
        type: "varchar"
    })
    password: string;

    @Column({
        type: "varchar"
    })
    hash: string;

    @OneToMany(type => Cv, cv => cv.user, {eager: true})
    cvs: Cv[]
}
