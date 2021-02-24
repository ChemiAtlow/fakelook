import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors";
import { classes, types } from "../models";

export function validationMiddleware<T extends {}>(
    type: { new (): T },
    skipMissingProperties = false,
    logger: types.Logger
) {
    return async (req: Request & { id: classes.guid }, _: Response, next: NextFunction) => {
        logger.verbose(`Attempting to validate ${type.name} for request ${req.id}`);
        const errors = await validate(plainToClass(type, req.body), {
            skipMissingProperties,
        });
        if (errors.length > 0) {
            logger.info(`${req.id} has failed DTO validation`, {
                errors,
                type: type.name,
            });
            const message = errors.map(error => Object.values(error.constraints || [])).join(", ");
            return next(new BadRequestError(message || "Validation failed!"));
        }
        logger.verbose(`${req.id} has completed DTO validation`);
        return next();
    };
}
