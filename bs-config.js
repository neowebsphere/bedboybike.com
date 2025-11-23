module.exports = {
  server: {
    baseDir: "./",
    index: "index.html"
  },
  files: [
    "**/*.html",
    "**/*.css",
    "**/*.js"
  ],
  watchOptions: {
    usePolling: true,
    interval: 500
  },
  port: 8080,
  ui: {
    port: 8081
  },
  open: false,
  host: "0.0.0.0"
};

