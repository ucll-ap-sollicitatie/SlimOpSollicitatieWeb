const axios = require("axios");
const webIp = "https://slimopsollicitatie.xyz:3001"
const localIp = "http://127.0.0.1:3001"

/**
 * get all jobs of a user
 */


async function getAlldatadb(eml) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${webIp}/users/getAll`,
                {
                    email: eml
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
            //console.log("respData: " + response.data)
            resolve(response.data)
            return response.data
        }).catch(function (error) {
            return "NOK"
        });
    })
}

/**
 * send an api request to log in a user based on the email (eml) and password(pss)
 */
async function logindb(eml, pss) {
    //return promise so that in login.js the function correctly waits for a response
    return new Promise((resolve, reject) => {

        axios
            // sends post request to the api on this path
            .post(`${webIp}/users/login`,
                //the request body:
                {
                    email: eml,
                    pass: pss,
                },
                //without header, it will not send a POST but a OPTIONS request
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then(function (response) {
            //console.log("respData: " + response.data)
            resolve(response.data)
            return response.data;
        })
            .catch(function (error) {
                return "NOK"
            });
    })
}

/**
 * send an api request register a user in the database
 *  eml: email
 *  pss: password
 *  un: username
 *  cp: confirm password
 */
async function registerdb(eml, pss, un, cp, vn) {
    return new Promise((resolve, reject) => {
        axios
            // sends post request to the api on this path
            .post(`${webIp}/users/register`,
                //the request body:
                {
                    email: eml,
                    pass: pss,
                    username: un,
                    confPass: cp,
                    vn: vn
                },
                //without header, it will not send a POST but a OPTIONS request
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then(function (response) {
            //console.log("respData: " + response.data)
            resolve(response.data)
            return response.data;
        })
            .catch(function (error) {
                return "NOK"
            });
    })
}

/**
 * api request to add a new job to the database
 */
async function addJobdb4params(tit, inter, tech, email) {
    return new Promise((resolve, reject) => {

        axios

            .post(`${webIp}/users/addjob`,
                {
                    titel: tit,
                    inter: inter,
                    tech: tech,
                    email: email
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
            //console.log("respData: " + response.data)
            resolve(response.data)
            return response.data
        }).catch(function (error) {
            return "NOK"
        });
    })
}

/**
 * api request to delete a job from the user
 */
async function deleteJobdb(titel, email) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${webIp}/users/deletejob`,
                {
                    titel: titel,
                    email: email
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
            //console.log("respData: " + response.data)
            resolve(response.data)
            return response.data
        }).catch(function (error) {
            return "NOK"
        });
    })
}

/**
 * api request to update tue username
 */
async function updateUsername(username, eml, pss) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({"username": username, "email": eml, "password": pss});

        var config = {
            method: 'post',
            url: `${webIp}/users/updateUsername`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                //console.log(response.data)
                resolve(response.data)
                return response;
            }).catch(function (error) {
            return "NOK"
        });

    })
}

async function videoInDb(name, email, timestamps) {
    return new Promise((resolve, reject) => {
        timestamps = `{${timestamps}}`
        axios
            .post(`${webIp}/users/vidInDb`,
                {
                    name: name,
                    email: email,
                    timestamps: timestamps
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
            //console.log("respData: " + response.data)
            resolve(response.data)
            return response.data
        }).catch(function (error) {
            return "NOK"
        });
    })
}

async function getAllVidsDb(email) {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://slimopsollicitatie.xyz:3001/users/getvidInDb?email=${email}`,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
}


async function getJobs(eml) {
    return new Promise((resolve, reject) => {

        var config = {
            method: 'get',
            url: `${webIp}/users/getAll?user=${eml}`,
            headers: {},
        };

        axios(config)
            .then(
                function (response) {
                    //console.log("respData: " + response.data)
                    resolve(response.data)
                    return response.data
                })
            .catch(function (error) {
                return "NOK"
            });
    })
}

async function getRecentVideos(email) {
    return new Promise((resolve, reject) => {

        var config = {
            method: 'get',
            url: `${webIp}/users/getRecent?user=${email}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                resolve(response.data)
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    })
}

async function setFeedback(vidname, feedback) {
    var data = JSON.stringify({"video": vidname, "feedback": feedback});
    console.log(data)
    var config = {
        method: 'post',
        url: `${webIp}/users/setFeedback`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function getFeedback(vidname) {
    return new Promise((resolve, reject) => {

        var data = '';

        var config = {
            method: 'get',
            url: `${webIp}/users/getfeedback?vid=${vidname}`,
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                resolve(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}

export {
    logindb,
    registerdb,
    deleteJobdb,
    getAlldatadb,
    getJobs,
    updateUsername,
    videoInDb,
    getAllVidsDb,
    getRecentVideos,
    addJobdb4params,
    setFeedback,
    getFeedback
}
