const axios = require("axios");

module.exports.logindb = async function logindb(a, b) {
    axios
      .post("http://127.0.0.1:3001/users/login",
      {
        email: "arnobunckens@hotmail.com",
        pass: "t"
    }).then((response) => {
        console.log("response " + response);
      }, (error) => {
        console.log("error " + error);
      });
}
