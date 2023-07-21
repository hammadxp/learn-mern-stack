const os = require("os");

const user = os.userInfo();
// console.log(user);

// console.log(`System uptime is ${os.uptime}`);

const systemInfo = {
  name: os.type(),
  version: os.release(),
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
};
console.log(systemInfo);
