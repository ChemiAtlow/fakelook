import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { json } from "body-parser";
import { appLoggerService } from "./services";
import { basicAuthRoutes, googleRouter } from "./routes";
import { constants, middleware, utils } from "@fakelook/common";
const { requestIdAssignMiddleware, errorMiddleware, notFoundMiddleware } = middleware;

morgan.token("id", function getId(req: Request) {
    return req.id;
});

utils.patchRouterParamForAsyncHandling();
const app = express();

const { authDomain, authPort, serverDomain, serverPort } = constants.URLS;

app.use(requestIdAssignMiddleware(appLoggerService));
app.use(helmet());
app.use(cors({
    origin: `${serverDomain}:${serverPort}`
}));
app.use(
    morgan(":id :method :url :status :response-time ms - :res[content-length]", {
        stream: appLoggerService.logStream,
    })
);
app.use(json());
app.use(compression());

app.use("/basic", basicAuthRoutes);
app.use("/google", googleRouter);

app.use("*", notFoundMiddleware(appLoggerService));
app.use(errorMiddleware(appLoggerService));

app.listen(authPort, () =>
    appLoggerService.debug(`Fakelook authentication server is running at ${authDomain}:${authPort}`)
);
