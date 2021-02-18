const axios = require("axios");



/**
 * send an api request based on the email (eml) and password(pss)
 */
async function logindb(eml, pss) {
  //return promise so that in login.js the function correctly waits for a response
  return new Promise((resolve, reject) =>{

  var data = JSON.stringify({"email":eml,"pass":pss});
  var config = {
    method: 'post',
    url: 'http://127.0.0.1:3001/users/login',
    headers: { 
      'Content-Type': 'application/json',
    },
    data : data
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

async function registerdb(eml, pss, un) {
  axios
  // sends post request to the api on this path
    .post("http://127.0.0.1:3001/users/register",
    //the request body:
    {
      email: eml,
      pass: pss,
      username: un
    },
    //without header, it will not send a POST but a OPTIONS request
    {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  }}
  ).then((response) => {
      JSON.stringify(response.data);
    }, (error) => {
      console.log("error " + error);
    });
}

export {
  logindb,
  registerdb
}
