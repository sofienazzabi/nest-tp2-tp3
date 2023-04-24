import { IsNotEmpty, IsString, MaxLength, MinLength, ValidationArguments } from "class-validator";
import ErrorMessage from "src/errors/error-message";

export class CreateTodoDto {
    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    @MinLength(3, {
        message: ErrorMessage.MIN_LENGTH
    })
    @MaxLength(10, {
        message: ErrorMessage.MAX_LENGTH
    })
    name: string;

    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    @MinLength(10, {
        message: ErrorMessage.MIN_LENGTH
    })
    description: string;
}