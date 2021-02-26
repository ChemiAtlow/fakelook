import { models } from "@fakelook/common";
import { Optional, Model, DataTypes } from "sequelize";
import { appLoggerService } from "../services";
import { sequelize } from "./MySqlConnection";

type UserAttributes = models.interfaces.AuthUser;

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role" | "provider"> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const userModel = sequelize.define<UserInstance>("User", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new DataTypes.STRING(10),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        allowNull: false,
        defaultValue: "user",
    },
    provider: {
        type: DataTypes.ENUM,
        values: ["basic", "google", "facebook"],
        allowNull: false,
        defaultValue: "basic"
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});
userModel.sync();

export const getUserByEmail = async (email: string) => {
    appLoggerService.verbose("Attempt to find a user by his email", { email });
    const user = await userModel.findOne({ where: { email } });
    appLoggerService.verbose(`User was ${user ? "found" : "not found"}`, user);
    return user;
};

export const getUserByUsername = async (username: string) => {
    appLoggerService.verbose("Attempt to find a user by his username", { username });
    const user = await userModel.findOne({ where: { username } });
    appLoggerService.verbose(`User was ${user ? "found" : "not found"}`, user);
    return user;
};

export const getUserWithResetToken = async (token: string) => {
    appLoggerService.verbose("Attempt to find a user by his reset token", { token });
    const user = await userModel.findOne({ where: { resetToken: token } });
    if (user && (user.resetTokenExpiration?.getTime() || 0) < Date.now()) {
        appLoggerService.info('User with token was found, but token is expired', { user: user.get() });
        await user.update({
            resetToken: null,
            resetTokenExpiration: null,
        });
        return null;
    }
    return user;
};
