  const express = require('express');
  const app = express();
  const http = require('http');
  const jwt = require('jsonwebtoken');
  const server = http.createServer(app);
  const routers = require('./routes/routes.js');
  const bodyParser = require('body-parser');
  const hbs = require('hbs');

  const path = require('path');

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended:false}));

  app.set('view engine', 'hbs');
  app.use('/public',express.static(path.join(__dirname, 'public')));

  app.use(routers);


  server.listen(5000,()=>{
    console.log("Server running on port:http://localhost:5000");
  });