var http = require('follow-redirects').https;
var fs = require('fs');

function logindb(eml, pass) {
    
var options = {
    'method': 'POST',
    'hostname': '127.0.0.1',
    'port': 3001,
    'path': '/users/login',
    'headers': {
      'Content-Type': 'application/json'
    },
    'maxRedirects': 20
  };
  
  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });
  
  var postData = JSON.stringify({"email":eml,"pass":pass});
  
  req.write(postData);
  
  req.end();
}


export {logindb}