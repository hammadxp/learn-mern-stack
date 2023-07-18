const path = require("path");

console.log(path.sep);

const filepath = path.join("folder", "subfolder", "file.txt");
const basename = path.basename(filepath);
const absolutePath = path.join(__dirname, "folder", "subfolder", "file.txt");

console.log(absolutePath);
