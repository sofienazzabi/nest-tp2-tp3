import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import ErrorMessage from "src/errors/error-message";
import { TodoStatusEnum } from "src/todo-module/todo/todo";

export class SearchTodoDto {
    @IsOptional()
    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @MaxLength(10, {
        message: ErrorMessage.MAX_LENGTH
    })
    data: string;

    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status?: TodoStatusEnum;
}