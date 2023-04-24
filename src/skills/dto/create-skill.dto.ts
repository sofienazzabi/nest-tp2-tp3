import { IsNotEmpty, IsString } from "class-validator";
import ErrorMessage from "src/errors/error-message";

export class CreateSkillDto {
    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    designation: string;
}