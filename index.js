// index.js

/**
 * Required External Modules
 */

 const express = require("express");
 var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 const path = require("path");
 var bodyParser = require('body-parser');

/**
 * App Variables
 */

 const app = express();
 const port = process.env.PORT || "1111";
 var jsonParser = bodyParser.json();

/**
 *  App Configuration
 */


/**
 * Routes Definitions
 */

 app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/express/mainpage.html'));
  });

  app.get("/main.css", (req, res) => {
    res.sendFile(path.join(__dirname+'/express/main.css'));
  });

  app.get("/main.js", (req, res) => {
    res.sendFile(path.join(__dirname+'/express/main.js'));
  });

  app.post("/speedDistr", jsonParser, (req, res) => {

    medians = ['8181508.4262428','5883936.7109499','7896222.2538517','7121070.7213269'];

    console.log(req.body);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://localhost:8123', false ); // false for synchronous request
    xmlHttp.send('select histogram(24)(ticktime) from(select ticktime from db_task8.userlog where day ='+req.body.day+' and speed >  '+medians[req.body.day-1]+') FORMAT JSON');
    
    res.send(xmlHttp.responseText);
  });

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });