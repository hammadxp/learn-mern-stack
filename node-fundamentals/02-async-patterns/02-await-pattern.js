const { readFile, writeFile } = require("fs").promises;
// const { promisify } = require("util");

// function getFileContent(file) {
//   return new Promise((resolve, reject) => {
//     readFile(file, "utf-8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

// const readFilePromise = promisify(readFile);
// const writeFilePromise = promisify(writeFile);

async function getFileContents() {
  try {
    const first = await readFile("./files/first.txt", "utf-8");
    const second = await readFile("./files/second.txt", "utf-8");
    // await writeFile("./files/second.txt", `${first} ${second}`);
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
}

// getFileContent("./files/first.txt")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

getFileContents();
