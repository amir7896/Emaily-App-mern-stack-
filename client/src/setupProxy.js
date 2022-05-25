const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/auth/google", "/auth/google/callback", "/api/*"],
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: false,
    })
  );
};
