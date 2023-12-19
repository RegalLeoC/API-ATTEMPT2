module.exports = {
  apps: [{
    name: "supermarketapi",
    script: "./dist/server.js",
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: "production",
    },
  }]
};

