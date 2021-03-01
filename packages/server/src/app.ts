import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { json } from "body-parser";
import { appLoggerService } from "./services";
// import { questionsRoutes, authRoutes, testRoutes, reportRoutes, examRoutes } from "./routes";
import { constants, middleware, utils } from "@fakelook/common";
import proxy from "express-http-proxy";
const { requestIdAssignMiddleware, errorMiddleware, notFoundMiddleware } = middleware;
const { authDomain, authPort } = constants.URLS;

morgan.token("id", function getId(req: Request) {
    return req.id;
});

utils.patchRouterParamForAsyncHandling();
const app = express();

app.use(requestIdAssignMiddleware(appLoggerService));
app.use(helmet());
app.use(cors());
app.use(
    morgan(":id :method :url :status :response-time ms - :res[content-length]", {
        stream: appLoggerService.logStream,
    })
);


app.use("/auth", proxy(`${authDomain}:${authPort}`));

app.use(json());
app.use(compression());

app.use("*", notFoundMiddleware(appLoggerService));
app.use(errorMiddleware(appLoggerService));

const { serverDomain, serverPort } = constants.URLS;

app.listen(serverPort, () =>
    appLoggerService.debug(`Fakelook server is running at ${serverDomain}:${serverPort}`)
);
