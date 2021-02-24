// instantiate the libraries we added up top
let express = require("express");
let multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
// create the server
const app = express();
// set up dotenv
dotenv.config();
// middleware that only parses json and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.json());// declared origins from which the server will accept requests
let allowedOrigins = ["http://localhost:3000"];
// middleware which checks the origins
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                let msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.use(function (req, res, next) {
    
    let origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


// we put process.env.port for hosting apps and the local port for dev purposes
app.listen(process.env.PORT || 5002, function () {
    console.log("App listening on", 5002);
});

// the folder on the server to which the files are to be uploaded (has to be created manually else you'll get the error)
const UPLOAD_FILES_DIR = "./uploads";
// set up storage
const storage = multer.diskStorage({
    // give it a destination
    destination(req, file, cb) {
        cb(null, UPLOAD_FILES_DIR);
    },
    // in case you want to manipulate the file name you can do it here
    filename(req, file = {}, cb) {
        const {originalname: originalName} = file;
        // if you want to get the name of the file w/o the extension
        let ogName = originalName.split('.')[0]
        // set the name based on the field that came with the request
        let someNameToSet = Date.now().toString()
        // check extension
        const fileExtension = ".webm";
        // set the name
        cb(null, `${someNameToSet}${fileExtension}`);
    }
});

// a method we'll use to parse the incoming multipart FormData
const upload = multer({storage});




app.post("/upload", upload.any(), async function (req, res) {
    var user = req.body.user
})