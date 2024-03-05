require("dotenv").config({});
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db-config");
const bodyParser = require("body-parser");
let path = require("path");
const authRoute = require("./controller/auth.contoller");
const courseRoute = require("./controller/courses.controller");
const userRoute = require("./controller/user.controller");
const subsRoute = require("./controller/subscription.controller");
const contactRoute = require("./controller/contact.controller");
const sholarshipRoute = require("./controller/sholarship.controller");
const apiPaymentRoute = require("./controller/apiPayment.controller");
var compression = require("compression");

connectDB();

var app = express();
app.use(compression());
app.use(express.static('uploads'));

app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, Product-Session, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Referer, User-Agent"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/access", authRoute);
app.use("/api/courses", courseRoute);
app.use("/api/user", userRoute);
app.use("/api/subscription", subsRoute);
app.use("/api/contact", contactRoute);
app.use("/api/sholarship", sholarshipRoute);
app.use("/api/api-payment", apiPaymentRoute);

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/api/subscription/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  // serve static assets from the build folder
  app.use(express.static(path.join(__dirname, "client/build")));
  // serve index.html for all remaining routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5500;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
