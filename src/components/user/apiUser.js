const axios = require("axios");

/**
 * send an api request based on the email (eml) and password(pss)
 */
module.exports.logindb = async function logindb(eml, pss) {

  var data = JSON.stringify({"email":eml,"pass":pss});
  // console.log(data)
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
    // console.log(response)
    data = JSON.stringify(response.data);
  })
  .catch(function (error) {
        // console.log(error);
    });
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
      JSON.stringify(response.data);
    }, (error) => {
      console.log("error " + error);
    });
}
