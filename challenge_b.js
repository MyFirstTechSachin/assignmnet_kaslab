const fs = require("fs");

const classifyObject = (obj) => {
  obj = obj.trim();
  if (!isNaN(parseFloat(obj)) && obj.trim().indexOf(".") !== -1) {
    return `${obj} - Real Number`;
  } else if (!isNaN(parseInt(obj, 10)) && obj.trim().indexOf(".") === -1) {
    return `${obj} - Integer`;
  } else if (
    obj
      .trim()
      .replace(/\s/g, "")
      .match(/^[a-z0-9]+$/i)
  ) {
    return `${obj.trim()} - Alphanumeric`;
  } else {
    return `${obj} - Alphabetical String`;
  }
};

const readAndClassify = (filename) => {
  const readStream = fs.createReadStream(filename, "utf8");
  let remaining = "";

  readStream.on("data", function (chunk) {
    remaining += chunk;
    let index = remaining.indexOf("\n");
    while (index > -1) {
      const line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      line.split(",").forEach((obj) => {
        console.log(classifyObject(obj));
      });
      index = remaining.indexOf("\n");
    }
  });

  readStream.on("end", function () {
    if (remaining.length > 0) {
      remaining.split(",").forEach((obj) => {
        console.log(classifyObject(obj));
      });
    }
  });
};

readAndClassify("output.txt");
