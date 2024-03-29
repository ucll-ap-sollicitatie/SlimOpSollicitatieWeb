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

const {Pool} = require('pg');
const { resolve } = require("path");
const { json } = require("body-parser");
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
            let vnaam = res.rows[0].voornaam

            if (uname === email && hashpw === pw) {
                console.log("Ingelogd")
            } else {
                resolve("err")
                return
            }
            const user = {
                username: name,
                email: email,
                jobs: getJobs(email),
                voornaam: vnaam
            }
            resolve(user)
            return user
        })

    })
}

function register(email, password, username, confPass, voornaam) {
    return new Promise((resolve, reject) => {

        let hPassword = hashCode(password);
        let confHashPassword = hashCode(confPass);
        if (!email.includes("@") || confHashPassword.toString() !== hPassword.toString()) {
            resolve("Err")
            return "Err"
        }
        console.log("registering user with email: " + email + " password: " + password + " username: " + username)
        pool.query('insert into slimopsol.users(email, hashedpassword, username, voornaam) values' + "('" + email + "' , '" + hPassword + "' , '" + username + "', '" + voornaam + "')", (err, res) => {
            console.log("G")
            makeJob(email)
            resolve("OK")
        })
    })

}

function getJobs(email) {
    try{
        pool.query('select * from slimopsol.job where email =' + "'" + email + "'", (err, res) => {
            try{
                jobs = res.rows
            }catch(err){
                console.log(err)
            }
        })
        return jobs
    }catch(err){
        console.log(err)
    }
}

function makeJob(email) {
    pool.query('insert into slimopsol.job(titel, inter, tech, email, titelmail) values' + "('Ober','Klantvriendelijkheid', 'Opdienden', " + "'" + email + "'," + "'Ober" + email + "')", (err, res) => {
    })
}

function makeNewJob(titel, inter, tech, tech2, email) {
    pool.query('insert into slimopsol.job(titel, inter, tech, email, titelmail) values' + "('" + titel + "', '" + inter + "', '" + tech + "', '" + email + "', '" + titel + email + "')", (err, res) => {
        console.log('insert into slimopsol.job(titel, inter, tech, tech2, email, titelmail) values' + "('" + titel + "', '" + inter + "', '" + tech + "', '" + tech2 + "', '" + email + "', '" + titel + email + "')")
        console.log(err)
    })
}

function updateUsername(username, email) {
    return new Promise((resolve, reject) => {

        pool.query('update slimopsol.users set username =' + "'" + username + "'" + 'where email = ' + "'" + email + "'", (err, res) => {
            console.log("username changed")
            resolve("OK")

        })

    })
}

function updatePassword(password, email) {
    let hashpw = hashCode(password).toString()

    pool.query('update slimopsol.users set hashedpassword =' + "'" + hashpw + "'" + 'where email = ' + "'" + email + "'", (err, res) => {
        console.log("password changed")
    })
}

function deleteJob(title, email) {
    pool.query('delete from slimopsol.job where titelmail =' + "'" + title + email + "'", (err, res) => {
        console.log(err)
    })
}

function setFeedback(video, feedback) {
    pool.query('update slimopsol.videos set feedback =' + "'" + feedback + "'" + 'where videoname = ' + "'" + video + "'", (err, res) => {
        console.log(err)
        resolve("OK")
    })
}

function videoInDb(name, email, timestamps) {
    pool.query('insert into slimopsol.videos(videoname, email, timestamps) values (' + "'" + name + "', '" + email + "','" + timestamps + "')", (err, res) => {
        console.log(err)
    })
}

function getFeedback(vidname){
    return new Promise((resolve, reject) => {
        pool.query('select * from slimopsol.videos where videoname = ' + "'" + vidname + "'", (err, res) => {
            let resul = ""
            res.rows.forEach(row => {
                resul = row.feedback
            })
            resolve(resul)
        })
    })
}

function getAllVidsFromUser(email) {
    return new Promise((resolve, reject) => {

        pool.query('select * from slimopsol.videos where email = ' + "'" + email + "'", (err, res) => {
            let arr = []
            res.rows.forEach(row => {
                const vid = {
                    "name": row.videoname,
                    "timestamps": row.timestamps,
                }
                arr.push(vid)
            })
            resolve(arr)

        })
    })

}

function get2MostRecentVids(email) {
    return new Promise((resolve, reject) => {

        pool.query('select * from slimopsol.videos where email =' + "'" + email + "'" + 'order by videoname desc LIMIT 2', (err, res) => {
            let arr = []
            try{
            res.rows.forEach(row => {
                arr.push(row.videoname)
            })
            resolve(arr)
        } catch (e) {
            resolve([])
        }

    })
}) }

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
    const path = reqUrl.path
    const regex = /\/users\/getAll\?user=(.*)/
    const regex2 = /\/users\/getRecent\?user=(.*)/
    const regex3 = /\/users\/vidInDb\?user=(.*)/
    const regex4 = /\/users\/getfeedback\?vid=(.*)/
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
        var ret = "true"
        //data will be the ?binary data?
        req.on('data', chunk => {
            data += chunk;
        })
        //parse data to JSON
        req.on('end', async () => {
            jsondata = JSON.parse(data)
            var i = await register(jsondata.email, jsondata.pass, jsondata.username, jsondata.confPass, jsondata.vn)
            if (i === "Err") {
                ret = "false"
            }
            res.writeHead(200, header);
            res.write(ret)
            res.end();
        })

    } else if (reqUrl.path === "/users/addjob" && req.method === "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            jsondata = JSON.parse(data)
            //console.log(jsondata.tech2)
            makeNewJob(jsondata.titel, jsondata.inter, jsondata.tech, jsondata.tech2, jsondata.email)
        })
        res.writeHead(200, header);
        console.log("false")
        res.write("true")
        res.end();
    } else if (reqUrl.path === "/users/deletejob" && req.method === "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            jsondata = JSON.parse(data)
            console.log(jsondata + " => conn.js")
            deleteJob(jsondata.titel, jsondata.email)
        })
        res.writeHead(200, header);
        console.log("true")
        res.write("true")
        res.end();
    } else if (path.match(regex) != null && req.method === "GET") {
        let data = '';
        email = path.match(regex)[1]
        console.log(email + " => Conn.js")
        try {
            jobs = await getJobs(email)
            console.log(jobs)
        } catch (err) {
            console.log(err)
        }
        // req.on('end', async () => {
        //     jsondata = JSON.parse(data)
        //     try {
        //     jobs = await getJobs(jsondata.email)
        //     console.log(jsondata)
        //     }catch(err){
        //         console.log(err)
        //     }
        // })

        res.writeHead(200, header);
        res.write(JSON.stringify(jobs))
        res.end();
    } else if (reqUrl.path === "/users/updateUsername" && req.method === "POST") {
        let data = '';
        var re = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', async () => {
            jsondata = JSON.parse(data)
            try {
                checkpass = await login(jsondata.email, jsondata.password)
            } catch {
                console.log("error")
            }
            console.log(checkpass.email)
            if (checkpass.email) {
                re = await updateUsername(jsondata.username, jsondata.email)
            } else {
                re = "Wrong password"
            }
            res.writeHead(200, header);
            res.write(re)
            res.end();

        })
    } else if (reqUrl.path === "/users/vidInDb" && req.method === "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            jsondata = JSON.parse(data)
            console.log(jsondata)
            videoInDb(jsondata.name, jsondata.email, jsondata.timestamps)
        })
        res.writeHead(200, header);
        console.log("true")
        res.write("true")
        res.end();
    } else if (path.match(regex3) != null && req.method === "GET") {
        email = path.match(regex3)[1]
        try {
            resul = await getAllVidsFromUser(email)
        }catch(err){
        }
        res.writeHead(200, header);
        res.write(JSON.stringify(resul))
        res.end();



    } else if (path.match(regex2) != null && req.method === "GET") {

        email = path.match(regex2)[1]
        console.log(email)
        try {
            resul = await get2MostRecentVids(email)
            console.log(resul)
        }catch (err) {
            console.log(err)
        }
        res.writeHead(200, header);
        res.write(JSON.stringify(resul))
        res.end();


    } else if (reqUrl.path === "/users/setFeedback" && req.method === "POST"){
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            jsondata = JSON.parse(data)
            setFeedback(jsondata.video, JSON.stringify(jsondata.feedback))

            res.writeHead(200, header);
            console.log("TRUE")
            res.write("true")
            res.end();

        })
    } else if (path.match(regex4) != null && req.method === "GET"){
        vid = path.match(regex4)[1]
        try {
            resul = await getFeedback(vid)
            console.log(resul)
        }
        catch(err){
        }
        res.writeHead(200, header);
        res.write(resul)
        res.end();
    }
    else {
        res.writeHead(200, header);
        console.log("TRUE")
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

function hashCode(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}


