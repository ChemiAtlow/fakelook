import { interfaces } from "..";
import { IsEmail, Matches, Length } from "class-validator";
import { validators } from "../../constants";

export class AuthUserDto implements Pick<interfaces.AuthUser, "email" | "password" | "username"> {
    @IsEmail()
    public email!: string;
    @Matches(validators.password)
    public password!: string;
    @Length(3, 10)
    public username!: string;
}
