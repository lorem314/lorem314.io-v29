module.exports = {
  apps: [
    {
      name: "lorem314.io-v29",
      script: "pnpm start --port 3029",

      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",

      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
