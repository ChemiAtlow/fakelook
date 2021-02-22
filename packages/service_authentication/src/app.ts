import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { json } from "body-parser";
import { appLoggerService } from "./services";
import { utils } from "@fakelook/common";
import { constants } from "@fakelook/common";
import { assignId, errorMiddleware, notFoundMiddleware } from "./middleware";

morgan.token("id", function getId(req: Request) {
    return req.id;
});

utils.patchRouterParamForAsyncHandling();
const app = express();

app.use(assignId);
app.use(helmet());
app.use(cors());
app.use(
    morgan(":id :method :url :status :response-time ms - :res[content-length]", {
        stream: appLoggerService.logStream,
    })
);
app.use(json());
app.use(compression());

// app.use("/auth", authRoutes);
app.use("*", notFoundMiddleware);
app.use(errorMiddleware);

const { authDomain, authPort } = constants.URLS;

app.listen(authPort, () =>
    appLoggerService.debug(`Fakelook server is running at ${authDomain}:${authPort}`)
);
