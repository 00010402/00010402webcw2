const fs = require("fs");
const path = require("path");
const root = require("./utils").root;

class DbContext {
    constructor() {
        this.collection = null;
    }

    useCollection(collection = "") {
        this.collection = path.join(root, `data/${collection}`);
    }

    deleteOne(id, successCb, errorCb) {
        fs.readFile(this.collection, "utf8", (err, data) => {
            if (err) errorCb();

            const records = JSON.parse(data);

            const filtered = records.filter(record => record.id != id) || [];

            fs.writeFile(this.collection, JSON.stringify(filtered), err => {
                if (err) errorCb();
                successCb();
            });
        });
    }
}

module.exports = DbContext;
