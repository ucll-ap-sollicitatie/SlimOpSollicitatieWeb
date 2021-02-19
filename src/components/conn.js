const http = require("http");
const url = require("url");

//hostname of the api
const hostname = "127.0.0.1";
//port of the api
const port = 3001;
const header = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    'Access-Control-Allow-Headers': "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
}

let jobs = []

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

function login(email, password) {
    //returns promise so that in createServer the await function works
    return new Promise((resolve, reject) => {

        pool.query('select * from slimopsol.users where email = ' + "'" + email + "'", (err, res) => {
            console.log(err)
            if (res.rowCount === 0) {
                console.log("foutje")
                return
            }

            let uname = res.rows[0].email
            let name = res.rows[0].username
            let pw = res.rows[0].hashedpassword.toString()
            let hashpw = hashCode(password).toString()
            console.log("pw in db: " + pw)
            console.log("Hashed gegeven pw: " + hashpw)

            if (uname === email && hashpw === pw) {
                console.log("Ingelogd")
            }

            else return
            const user = {
                username: name,
                email: email,
                jobs: getJobs(email)
            }
            resolve(user)
            return user
        })

    })
}

function register(email, password, username) {
    let hPassword = hashCode(password);
    if (!email.includes("@")) {
        throw new Error("this is not an email")
    }
    console.log("registering user with email: " + email + " password: " + password + " username: " + username)
    pool.query('insert into slimopsol.users(email, hashedpassword, username) values' + "('" + email + "' , '" + hPassword + "' , '" + username + "')", (err, res) => {
        console.log("G")
        makeJob(email)
    })

}

function getJobs(email) {
    pool.query('select * from slimopsol.job where email =' + "'" + email + "'", (err, res) => {
        jobs =  res.rows
    })
    return jobs
}


function makeJob(email) {
    pool.query('insert into slimopsol.job(titel, inter, tech, tech2, email, titelmail) values' + "('Ober','Klantvriendelijkheid', 'Opdienden', 'Bestelling afnemen', " + "'" + email + "'," + "'Ober" + email + "')", (err, res) => {
    })
}

/**
 * Creates server, with possible requests.
 *
 * To add a request:
 * add if statement and check on:
 *      - reqUrl.pathname: the path where you will request the api
 *      - req.method: request type (POST,GET,...)
 * And write the body
 */

const server = http.createServer((req, res) => makeServer(req, res))

async function makeServer(req, res) {
    const reqUrl = url.parse(req.url, true);
    /**
     * Login user
     */
    if (reqUrl.pathname == "/users/login" && req.method === "POST") {
        let data = '';
        //data will be the ?binary data?
        req.on('data', chunk => {
            data += chunk;
        })
        user = {}
        //parse data to JSON
        req.on('end', async () => {
            jsondata = JSON.parse(data)
            try {
                user = await login(jsondata.email, jsondata.pass)
                console.log(user)
            } catch (error) {
                res.writeHead(200, header);
                console.log("error" + error)
                // res.end('NOK: ' + error); 
            }
            res.writeHead(200, header);
            console.log(JSON.stringify(user))
            res.write(JSON.stringify(user))
            res.end();
        })
        /**
         * Register user
         */
    } else if (reqUrl.pathname == "/users/register" && req.method === "POST") {
        let data = '';
        //data will be the ?binary data?
        req.on('data', chunk => {
            data += chunk;
        })
        //parse data to JSON
        req.on('end', () => {
            jsondata = JSON.parse(data)
            register(jsondata.email, jsondata.pass, jsondata.username)
        })
        res.writeHead(200, header);
        console.log("true")
        res.write("true")
        res.end();  

    } else {
        res.writeHead(200, header);
        console.log("true")
        res.write("true")
        res.end();        
    }

}

/**
 * Create a server that listens on defined port.
 * If there is an error, print it
 * If there is on error, log that server is running
 */
server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`API at http://${hostname}:${port}/`)
})

function updateUsername(username, email){
    pool.query('update slimopsol.users set username =' + "'" + username + "'" + 'where email = ' + "'" + email + "'", (err, res) => {
        console.log("username changed")
    })
}

function updatePassword(password, email){
    let hashpw = hashCode(password).toString()

    pool.query('update slimopsol.users set hashedpassword =' + "'" + hashpw + "'" + 'where email = ' + "'" + email + "'", (err, res) => {
        console.log("password changed")
    })
}

function hashCode(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}
