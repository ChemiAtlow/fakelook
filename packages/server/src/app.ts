import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { json } from "body-parser";
import { appLoggerService } from "./services";
import { constants, middleware, utils } from "@fakelook/common";
import { authRoutes, /* identityRoutes */ } from "./routes";
import { authMiddleware } from "./middleware";

const {
    requestIdAssignMiddleware,
    errorMiddleware,
    notFoundMiddleware,
} = middleware;

morgan.token("id", function getId(req: Request) {
    return req.id;
});

utils.patchRouterParamForAsyncHandling();
const app = express();

app.use(requestIdAssignMiddleware(appLoggerService));
app.use(helmet());
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(
    morgan(
        ":method - Req :id :url :status :response-time ms - :res[content-length]",
        {
            stream: appLoggerService.logStream,
        }
    )
);

app.use(json());

app.use("/auth", authRoutes);
app.use(authMiddleware);

//app.use("/identity", identityRoutes)

app.use(compression());

app.use("*", notFoundMiddleware(appLoggerService));
app.use(errorMiddleware(appLoggerService));

const { serverDomain, serverPort } = constants.URLS;

app.listen(serverPort, () =>
    appLoggerService.debug(
        `Fakelook server is running at ${serverDomain}:${serverPort}`
    )
);
