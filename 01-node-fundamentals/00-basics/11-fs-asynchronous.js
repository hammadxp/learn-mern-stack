const { readFile, writeFile } = require("fs");

readFile("./files/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;

  readFile("./files/second.txt", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;

    writeFile("./fs-asynchronous.txt", `Combined: ${first} ${second}`, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(result);
    });
  });
});
