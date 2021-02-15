const axios = require("axios");

/**
 * send an api request based on the email (eml) and password(pss)
 */
module.exports.logindb = async function logindb(eml, pss) {
    axios
    // sends post request to the api on this path
      .post("http://127.0.0.1:3001/users/login",
      //the request body:
      {
        email: eml,
        pass: pss
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
