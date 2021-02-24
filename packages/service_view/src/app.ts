import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { json } from "body-parser";
import { appLoggerService } from "./services";
// import { questionsRoutes, authRoutes, testRoutes, reportRoutes, examRoutes } from "./routes";
import { constants, middleware, utils } from "@fakelook/common";
const { requestIdAssignMiddleware, errorMiddleware, notFoundMiddleware } = middleware;

morgan.token("id", function getId(req: Request) {
    return req.id;
});

utils.patchRouterParamForAsyncHandling();
const app = express();

const { viewDomain, viewPort, serverDomain, serverPort } = constants.URLS;

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

// app.use("/auth", authRoutes);
app.use("*", notFoundMiddleware(appLoggerService));
app.use(errorMiddleware(appLoggerService));

app.listen(viewPort, () =>
    appLoggerService.debug(`Fakelook view server is running at ${viewDomain}:${viewPort}`)
);
