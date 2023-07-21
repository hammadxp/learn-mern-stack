const { readFileSync, writeFileSync } = require("fs");

// writeFileSync("./files/first.txt", "This is first file.", { flag: "a" });
// writeFileSync("./files/second.txt", "This is second file.", { flag: "a" });

const first = readFileSync("./files/first.txt", "utf-8");
const second = readFileSync("./files/second.txt", "utf-8");

console.log(first, second);
