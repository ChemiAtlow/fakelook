import { Sequelize } from "sequelize";
import { DbInfo } from "../constants";
const { mySqlDb, mySqlDomain, mySqlPassword, mySqlPort, mySqlUser } = DbInfo;

export const sequelize = new Sequelize(
    `mysql://${mySqlUser}:${mySqlPassword}@${mySqlDomain}:${mySqlPort}/${mySqlDb}`
);
