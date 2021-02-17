const http = require("http");
const url = require("url");

//hostname of the api
const hostname = "127.0.0.1";
//port of the api
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
        if(res.rowCount === 0 ){
            console.log("foutje")
            throw new Error("No user found")
        }
            let uname = res.rows[0].email
            let pw = res.rows[0].hashedpassword.toString()
            let hashpw = hashCode(password).toString()
            console.log("pw in db: " + pw)
            console.log("Hashed gegeven pw: " + hashpw)
            if(uname === email && hashpw === pw){
                console.log("Ingelogd")
            } else throw new Error("Foute gebruikersnaam/password")
            pool.end()
        
    })
}

register("arnob", "t")



function register(email, password, username){
    let hPassword = hashCode(password);
    if(!email.includes("@")){
        throw new Error("this is not an email")
    }
    console.log("registering user with email: " + email + " password: " + password + " username: " + username)
    pool.query('insert into slimopsol.users(email, hashedpassword, username) values' + "('" + email + "' , '" + hPassword + "' , '" + username + "')", (err, res) => {
        console.log("G")
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

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == "/users/login" && req.method === "POST") {
        let data = '';
        //data will be the ?binary data?
        req.on('data', chunk => {
            data += chunk;
          })
        //parse data to JSON
          req.on('end', () => {
            jsondata = JSON.parse(data) 
            login(jsondata.email, jsondata.pass)
        })
        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Headers': "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
          });
        res.end('OK');          
    }

    if (reqUrl.pathname == "/users/register" && req.method === "POST"){
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
        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Headers': "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
          });
        res.end('OK');          

    }
    res.writeHead(200, {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      });
    res.end('NOK');          


})
/**
 * Create a server that listens on defined port.
 * If there is an error, print it
 * If there is on error, log that server is running
 */
server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`API at http://${hostname}:${port}/`)
})



function hashCode(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}
