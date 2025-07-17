require("module-alias/register");
const express = require("express");
const path = require("path");
const router = require("./src/routers");
const connect = require("@db/connect");
const dotenv = require("dotenv");
const app = express();
const methodOverride = require("method-override");

const port = 8888;

// env config
dotenv.config();

// Getting all information from json and form submit
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Serve static files
app.use("/public", express.static("public"));

// Pug views configs
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "src/views"));
app.locals.basedir = path.resolve(__dirname, "src/views");

// App's routings
router(app);

// Connect to db;
connect("user_db");

// Start server
app.listen(port, () => {
	console.log(" Server is started ");
});

/* app.get("/", (req,res)=>{
    res.redirect("/")
}) */
/* 

// Create, update, remove, read the songs



*/
