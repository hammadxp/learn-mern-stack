let count = 1;

setInterval(() => {
  console.log("hello world", count);
  count++;
}, 1000);

console.log(`I will run first`);

// process stays alive unless user stops it by pressing CTRL+C
