import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { json } from "body-parser";
import { appLoggerService } from "./services";
// import { questionsRoutes, authRoutes, testRoutes, reportRoutes, examRoutes } from "./routes";
import { constants, utils } from "@fakelook/common";
import { middleware } from "@fakelook/common/src/backend";
const { errorMiddleware, requestIdAssignMiddleware, notFoundMiddleware } = middleware;

morgan.token("id", function getId(req: Request) {
    return req.id;
});

utils.patchRouterParamForAsyncHandling();
const app = express();

const { postsDomain, postsPort, serverDomain, serverPort } = constants.URLS;

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

app.listen(postsPort, () =>
    appLoggerService.debug(`Fakelook posts server is running at ${postsDomain}:${postsPort}`)
);
