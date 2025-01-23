const fs = require("fs");
const { Writable } = require("stream");

const generateAlphabeticalString = (length = 10) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

const generateRealNumber = () => (Math.random() * 100).toFixed(2);

const generateInteger = () => Math.floor(Math.random() * 100);

const generateAlphanumeric = () => {
  const length = Math.floor(Math.random() * 10) + 1;
  const spacesBefore = Math.floor(Math.random() * (11 - length));
  const spacesAfter = 10 - spacesBefore - length;
  const content = Array.from({ length }, () =>
    Math.random().toString(36).charAt(2)
  ).join("");
  return " ".repeat(spacesBefore) + content + " ".repeat(spacesAfter);
};

const targetSize = 10 * 1024 * 1024; // 10MB in bytes
let currentSize = 0;
const writable = fs.createWriteStream("output.txt", { flags: "w" });

const dataStream = new Writable({
  write(chunk, encoding, callback) {
    currentSize += chunk.length;
    writable.write(chunk);
    if (currentSize >= targetSize) {
      writable.end();
      console.log("Finished writing 10MB of data.");
    } else {
      generateLine();
    }
    callback();
  },
});

const generateLine = () => {
  const data =
    [
      generateAlphabeticalString(),
      generateRealNumber(),
      generateInteger(),
      generateAlphanumeric(),
    ].join(",") + "\n";
  dataStream.write(data);
};

generateLine();
