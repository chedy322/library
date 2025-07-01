const { parse } = require("json2csv");
const fs = require("fs");
const csv = require("csv-parser");

function saveLibraries(libraries) {
    const fields = ["Zip", "Branch", "Address", "City", "Webpage", "Phone", "Wi-Fi", "Computers"];
    const opts = { fields };
    const rows = libraries.map(lib => ({
      Zip: lib.Zip,
      Branch: lib.name,
      Address: lib.address,
      City: lib.city,
      Webpage: lib.webpage,
      Phone: lib.phone,
      "Wi-Fi": lib.wifi,
      Computers: lib.computers
    }));
    const csvData = parse(rows, opts);
    return fs.promises.writeFile("dataset/urbino_dataset.csv", csvData);
}

  function readLibraries() {
    return new Promise((resolve, reject) => {
      const results = [];
      const wifi = "Wi-Fi";
  
      fs.createReadStream("dataset/urbino_dataset.csv")
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            Zip: row.Zip,
            name: row.Branch,
            address: row.Address,
            city: row.City,
            webpage: row.Webpage,
            phone: row.Phone,
            wifi: row[wifi],
            computers: row.Computers,
          });
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
module.exports={saveLibraries,readLibraries}