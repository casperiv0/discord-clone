import express from "express";
import helmet from "helmet";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

import { SocketService } from "services/Socket";
import { apiRouter } from "./routes/api";

const expressServer = express();
new SocketService(expressServer);

expressServer.use(helmet());
expressServer.use(cors({ origin: "http://localhost:3000", credentials: true }));
expressServer.use(compression());
expressServer.use(express.json());
expressServer.use(cookieParser());
expressServer.use("/api", apiRouter, csurf({ cookie: true }));
