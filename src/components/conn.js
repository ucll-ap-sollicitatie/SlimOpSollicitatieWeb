const {Pool} = require('pg')
const pool = new Pool({
    user: 'civracsv',
    host: 'dumbo.db.elephantsql.com',
    database: 'civracsv',
    password: 'vlubeHQ53ZlJ0XLNHnHvk_SyRDW0MIME',
    port: 5432,
})

let x = "";
export default function printName() {
    pool.query('select * from "test".testje limit 1', (err, res) => {
        let result = res.rows[0].naam
        if (result != null) {
            x = result
            console.log(result + " --> result from Query")
            return result
        } else pool.end()
    })
    return x;
}


async function log() {
    await new Promise(r => setTimeout(r, 2000));
    console.log("TEST= " + x)
}

log()


