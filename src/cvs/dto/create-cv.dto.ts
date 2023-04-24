import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import ErrorMessage from "src/errors/error-message";

export class CreateCvDto {
    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    name: string;

    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    firstname: string;

    @IsNumber()
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    age: number;

    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    cin: string;

    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    job: string;

    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    path: string;
}