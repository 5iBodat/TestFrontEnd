const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/fee-assessment-categories", {
            target: "https://asia-southeast2-sejutacita-app.cloudfunctions.net",
            changeOrigin: true,
        })
    )
}