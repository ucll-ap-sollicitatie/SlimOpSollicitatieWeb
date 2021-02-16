const axios = require("axios");

/**
 * send an api request based on the email (eml) and password(pss)
 */
module.exports.logindb = async function logindb(eml, pss) {
  var data = JSON.stringify({"email":eml,"pass":pss});
  
  var config = {
    method: 'post',
    url: 'http://127.0.0.1:3001/users/login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  });
  

    // axios
    // // sends post request to the api on this path
    //   .post("http://127.0.0.1:3001/users/login",
    //   //the request body:
    //   {
    //     email: eml,
    //     pass: pss
    //   },
    //   //without header, it will not send a POST but a OPTIONS request
    //   {headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // }}
    // ).then((response) => {
    //     console.log("response " + response);
    //   }, (error) => {
    //     console.log("error " + error);
    //   });
}

module.exports.registerdb = async function registerdb(eml, pss, un) {
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
      console.log("response " + response);
    }, (error) => {
      console.log("error " + error);
    });
}
