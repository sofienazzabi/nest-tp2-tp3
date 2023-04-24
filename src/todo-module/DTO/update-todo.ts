import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import ErrorMessage from "src/errors/error-message";
import { TodoStatusEnum } from "src/todo-module/todo/todo";
import { CreateTodoDto } from "./create-todo";

export class UpdateTodoTdo extends PartialType(CreateTodoDto) {
    id: string;

    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status?: TodoStatusEnum;
}