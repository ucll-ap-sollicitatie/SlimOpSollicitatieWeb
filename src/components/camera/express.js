
let express = require("express");
let multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const fs = require("fs");
const app = express();
dotenv.config();
app.use(bodyParser.json());
let allowedOrigins = ["http://localhost:3000"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                let msg =
                    "Geen toegang"
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.use(function (req, res, next) {
    
    let origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(process.env.PORT || 5002, function () {
    console.log("App listening on", 5002);
});

const UPLOAD_FILES_DIR = "./uploads";
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, UPLOAD_FILES_DIR);
    },
    filename(req, file = {}, cb) {
        const {originalname: originalName} = file;
        let ogName = originalName.split('.')[0]
        console.log(originalName)
        cb(null, `${originalName}`);
    }
});

const upload = multer({storage});

app.post("/upload", upload.any() , async function (req, res) {
})

app.get("/video/:name", function(req, res){
    const range = req.headers.range;
    console.log(range)
    if(!range){
        res.status(400).send("Requires header range")
    }

    const videoPath = "./uploads/" + req.params.name

    const videoSiza = fs.statSync(videoPath).size
    const chunksize = 10**6
    const start = Number(range.replace(/\D/g,""))
    const end = Math.min(start + chunksize, videoSiza - 1)

    const videoStream = fs.createReadStream(videoPath, {start, end})
    videoStream.pipe(res)
})
