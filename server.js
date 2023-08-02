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
//process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

connectDB();

let app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/access", authRoute);
app.use("/api/courses", courseRoute);
app.use("/api/user", userRoute);
app.use("/api/subscription", subsRoute);
app.use("/api/contact", contactRoute);

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
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5500;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
