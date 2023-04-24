import { TodoStatusEnum } from "src/todo-module/todo/todo";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import DatedEntity from "./DatedEntity";

@Entity("tdo")
export default class TodoEntity extends DatedEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar"
    })
    name: string;

    @Column({
        type: "varchar"
    })
    description: string;

    @Column({
        type: "enum",
        enum: TodoStatusEnum,
        default: TodoStatusEnum.waiting
    })
    status: TodoStatusEnum;
}