import express from "express";
import cookieParser from "cookie-parser";
import { SocketService } from "services/Socket";
import { apiRouter } from "./routes/api";

const expressServer = express();
new SocketService(expressServer);

expressServer.use(express.json());
expressServer.use(cookieParser());
expressServer.use("/api", apiRouter);
