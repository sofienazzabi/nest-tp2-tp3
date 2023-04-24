import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import ErrorMessage from "src/errors/error-message";

export class AddSkillCvDto {
    @IsString({
        message: ErrorMessage.IS_STRING
    })
    @IsNotEmpty({
        message: ErrorMessage.NOT_EMPTY
    })
    @IsUUID()
    skillId: string;
}