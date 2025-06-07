var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Starting the server
app.listen(3000, () => {
console.log("Server running on port 3000");
});
