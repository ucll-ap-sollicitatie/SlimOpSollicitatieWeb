const { Pool } = require('pg')
const pool = new Pool({
    user: 'civracsv',
    host: 'dumbo.db.elephantsql.com',
    database: 'civracsv',
    password: 'vlubeHQ53ZlJ0XLNHnHvk_SyRDW0MIME',
    port: 5432,
})

pool.query('select * from test.testje limit 1', (err, res) => {
    console.log(res.rows[0].naam)
    pool.end()
})
function printName() {
    pool.query('select * from "test".testje limit 1', (err, res) => {
        console.log(res.rows)
        pool.end()
    })

}


