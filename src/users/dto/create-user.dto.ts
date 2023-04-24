import { IsNotEmpty, IsString } from "class-validator";
import ErrorMessage from "src/errors/error-message";

export class CreateUserDto {
    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    username: string;

    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    email: string;

    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    password: string;
}
