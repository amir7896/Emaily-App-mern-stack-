const express = require("express");
const path = require("path");

// Cookie Session

const keys = require("./confing/keys");
// Passport Strategy Getting From the Services Directory...
const authRoute = require("./routes/authRoute");
const billingRoute = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
// DB Connection file importing..
const DBCon = require("./confing/db");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./services/passport");

const app = express();

app.use(express.json());
// Cookie Use
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.CookieKey],
  })
);
// Passport Use ..
app.use(passport.initialize());
app.use(passport.session());
// Different Routes ...
app.use("/", authRoute);
app.use("/", billingRoute);
app.use("/api", surveyRoutes);

// Database Connection...
DBCon();
// if (process.env.NODE_ENV === "production") {
//   // Express will serve up production assets
//   // Like our main.js and main.css file.!
//   app.use(express.static(path.join(__dirname, "client", "build")));
//   // Express will serve Up the index.html file!
//   // if it doesn't recognize the route
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }
// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port 5000");
});
