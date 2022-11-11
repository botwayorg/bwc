import express from "express";
const app = express();
import cors from "cors";
import createError from "http-errors";
import { corsOptions } from "./config/corsOptions";
import { logger } from "./middleware/logEvents";
import { errorHandler } from "./middleware/errorHandler";
import { verifyJWT } from "./middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { credentials } from "./middleware/credentials";
const PORT = process.env.PORT || 3500;

app.set("views", __dirname);
app.set("view engine", "pug");

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("layout", {
    message: JSON.stringify(
      { status: err.status, message: err.message },
      null,
      " "
    ).toString(),
  });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
