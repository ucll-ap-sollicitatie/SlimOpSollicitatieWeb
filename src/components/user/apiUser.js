const axios = require("axios");

module.exports.logindb = async function logindb(eml, pss) {
    axios
      .post("http://127.0.0.1:3001/users/login",
      {
        email: eml,
        pass: pss
      },
      {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}
    ).then((response) => {
        console.log("response " + response);
      }, (error) => {
        console.log("error " + error);
      });
}
