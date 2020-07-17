const connection = require("../config/connection");

function objToSql(ob) {
    let arr = [];

    for (let key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};

let orm = {
    selectAll: (selectedTable, cb) => {
        let queryString = `SELECT * FROM ${selectedTable};`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    insertOne: (table, column, values, cb) => {
        let queryString = `INSERT INTO ${table} ( ${column.toString()} ) VALUES (?,?)`;

        console.log("Inserted: ");
        console.log(queryString);

        connection.query(queryString, values, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    updateOne: (table, columnValues, condition, cb) => {
        let queryString = `UPDATE ${table} SET ${objToSql(columnValues)} WHERE ${condition}`;

        console.log(queryString);

        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    }
};

module.exports = orm;