import { models } from "@fakelook/common";
import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "./MySqlConnection";

type UserAttributes = models.interfaces.AuthUser;

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role"> {}

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
