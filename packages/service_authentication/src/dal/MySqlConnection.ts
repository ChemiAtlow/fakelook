import { Sequelize } from "sequelize";
import { dbInfo } from "../constants";
import { appLoggerService } from "../services";
const { mySqlDb, mySqlDomain, mySqlPassword, mySqlPort, mySqlUser } = dbInfo;

export const sequelize = new Sequelize(
    `mysql://${mySqlUser}:${mySqlPassword}@${mySqlDomain}:${mySqlPort}/${mySqlDb}`, { logging: appLoggerService.debug }
);
