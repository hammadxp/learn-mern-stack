const { createReadStream } = require("fs");

const stream = createReadStream("./content/big.txt", {
  highWaterMark: 90000, // default buffer is 64kb
  encoding: "utf-8",
});

stream.on("data", (chunk) => {
  console.log(chunk);
});
stream.on("error", (err) => console.log(err));

// default buffer is 64kb
// last buffer will have the remainder
// highWaterMark - controls buffer size
