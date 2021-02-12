const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 't',
    port: 5432,
})



pool.query('select * from "test".testje limit 1 ', (err, res) => {
    console.log(res.rows)
    pool.end()
})
function printName() {
    pool.query('select * from "test".testje limit 1 ', (err, res) => {
        console.log(res.rows)
        pool.end()
    })

}


