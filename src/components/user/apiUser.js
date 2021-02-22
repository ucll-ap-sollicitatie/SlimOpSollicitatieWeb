const axios = require("axios");

const webIp = "http://127.0.0.1:3001"


async function getJobs(eml){
    return new Promise((resolve, reject) => {

    var config = {
        method: 'get',
        url: `http://127.0.0.1:3001/users/getAll?user=${eml}`,
        headers: { },
      };
      
      axios(config)
      .then(
        function (response) {
            console.log("respData: " + response.data)
            resolve(response.data)
            return response.data
        })
        .catch(function (error) {
            return "NOK"
        });
    })
}

async function getAlldatadb(eml){
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
        console.log("respData: " + response.data)
        resolve(response.data)
        return response.data
    }).catch(function (error) {
        return "NOK"
    });
    })
}


/**
 * send an api request based on the email (eml) and password(pss)
 */
async function logindb(eml, pss) {
    //return promise so that in login.js the function correctly waits for a response
    return new Promise((resolve, reject) => {

        var data = JSON.stringify({"email": eml, "pass": pss});
        var config = {
            method: 'post',
            url: `${webIp}/users/login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(response.data)
                resolve(response.data)
                return response;
            })
            .catch(function (error) {
                return "NOK"
                // console.log(error);
            });
    })
}

async function registerdb(eml, pss, un, cp) {
    return new Promise((resolve, reject) => {

        axios
            // sends post request to the api on this path
            .post(`${webIp}/users/register`,
                //the request body:
                {
                    email: eml,
                    pass: pss,
                    username: un,
                    confPass: cp
                },
                //without header, it will not send a POST but a OPTIONS request
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then(function (response) {
            console.log("respData: " + response.data)
            resolve(response.data)
            return response.data;
        })
            .catch(function (error) {
                return "NOK"
                // console.log(error);
            });
    })
}

async function addJobdb(tit, inter, tech, tech2, email) {
    return new Promise((resolve, reject) => {

        axios

            .post(`${webIp}/users/addjob`,
            {
                titel: tit,
                inter: inter,
                tech: tech,
                tech2: tech2,
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
            console.log("respData: " + response.data)
            resolve(response.data)
            return response.data
        }).catch(function (error) {
            return "NOK"
        });
    })
}

async function deleteJobdb(titel, email){
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
            console.log("respData: " + response.data)
            resolve(response.data)
            return response.data
        }).catch(function (error) {
            return "NOK"
        });
    })
}
async function updateUsername(username, eml){
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({"username": username, "email": eml});

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:3001/users/updateUsername',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data)
            resolve(response.data)
            return response;
        }).catch(function (error) {
            return "NOK"
        });
          
    })
}
export {
    logindb,
    registerdb,
    addJobdb,
    deleteJobdb,
    getAlldatadb,
    getJobs,
    updateUsername
}
