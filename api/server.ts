import express from "express";
import config from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import logger from "./utils/logger";

const port = config.port;

const app = express();

app.set("views", __dirname);
app.set("view engine", "pug");

app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", require("./utils/root"));

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);
});
