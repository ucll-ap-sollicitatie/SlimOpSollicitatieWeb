const http = require("http");
const url = require("url");
const hostname = "127.0.0.1";
const port = 3001;

const {Pool} = require('pg')
const pool = new Pool({
    user: 'civracsv',
    host: 'dumbo.db.elephantsql.com',
    database: 'civracsv',
    password: 'vlubeHQ53ZlJ0XLNHnHvk_SyRDW0MIME',
    port: 5432,
})

/**
let x = "";
function printName() {
    pool.query('select * from slimopsol.users', (err, res) => {
        let result = res.rows[0].username
        if (result != null) {
            x = result
            console.log(result + " --> result from Query")
            return result
        } else pool.end()
    })
    return x;
}

//printName()

async function log() {
    await new Promise(r => setTimeout(r, 2000));
    console.log("TEST= " + x)
}

//log()
*/

function login(email, password){
    pool.query('select * from slimopsol.users where email = '+ "'" + email + "'", (err, res) => {
        console.log(res)
        console.log(res.rows[0].email)
        console.log(res.rows[0].hashedpassword)
        let uname = res.rows[0].email
        let pw = res.rows[0].hashedpassword
        if(uname === email && password === pw){
            console.log("Ingelogd")
        } else console.log("Login failed")
        pool.end()
    })
}


const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == "/users/login" && req.method === "POST") {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
          })
          req.on('end', () => {
            jsondata = JSON.parse(data) 
            login(jsondata.email, jsondata.pass)
        })   
    }
})

server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`API at http://${hostname}:${port}/`)
})