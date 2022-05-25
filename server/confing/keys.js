// keys.js figure out what to set credential

if (process.env.NODE_ENV === "production") {
  // We are in porduction to set our production credentials
  module.exports = require("./prod");
} else {
  // We are in development return the Dev Key.
  module.exports = require("./dev");
}

// PRO DB =
// PRO KEY =
// PRO SEC =
