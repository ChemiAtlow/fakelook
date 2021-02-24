import { validators } from "../../constants";
import { Matches } from "class-validator";

export class ResetPasswordDto {
    @Matches(validators.password)
    password!: string;
}
