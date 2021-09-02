
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123getaneh',
    database: 'wecodepoject2'
}
)

const queryPromise = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            // console.log(query);
            if (error) reject(error)
            else resolve(result)
        });
    })
}
module.exports = {
    queryPromise
}