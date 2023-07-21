const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", () => {
  console.log("Data recieved");
});

customEmitter.on("response", (name, id) => {
  console.log(`Data recieved: Name ${name} with id ${id}`);
});

customEmitter.emit("response", "Hammad", 23); // for test only
