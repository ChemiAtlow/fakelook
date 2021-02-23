import * as c from "@fakelook/common";

declare global {
    namespace Express {
        interface Request {
            id: string;
            // id: models.classes.guid;
            // user?: models.interfaces.User;
        }
    }
}
