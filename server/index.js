const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const dotenv = require("dotenv");

const authRouter = require('./routes/AuthRoute');
const adminRouter = require('./routes/AdminRoute');

const connectMongoDb = require('./config/connection')
connectMongoDb()

dotenv.config({ path: ".env" });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.REACT_URI],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use('/admin', adminRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  const warning = res.locals.message;
  res.status(err.status || 500);
  res.render("error", { warning });
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
