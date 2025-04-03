module.exports = {
  apps: [{
    name: "sistema-rachas",
    script: "./dist/main.js",
    env: {
      NODE_OPTIONS: "--import tsx",
      DB_DRIVER: "mongodb",
      DB_HOST: "localhost",
      DB_USER: "root",
      DB_DATABASE: "sistema-rachas",
      DB_AUTH_SOURCE: "admin",
      DB_PASSWORD: "password",
      DB_URI: "mongodb://root:password@localhost:27017/sistema-rachas?authSource=admin",
      DB_PORT: "27017",
      PORT: "3002",
      JWT_SECRET: "diasdjp1dj12diasd-ascni1-23o1jdsad",
      SALTS_PASSWORD: "10"
    }
  }]
};
