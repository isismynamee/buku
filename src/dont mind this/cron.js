const nodeCron = require("node-cron");

nodeCron.schedule('1-5 * * * *', () => {
    console.log('running every minute to 1 from 5');
  });