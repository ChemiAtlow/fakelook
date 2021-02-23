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
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        allowNull: false,
        defaultValue: "user",
    },
});
