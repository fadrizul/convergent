/*
* Copyright (c) MyTeksi GrabTaxi 2014
* Author: Fadrizul Hasani <fadrizul@grabtaxi.com>
* Date: 2014-07-10 02:40:27
* Modified by: fadrizul
* Modified time: 2014-07-10 03:00:22
*/

(function () { 'use strict';
  var express, app, bodyParser;
  express = require('express');
  bodyParser = require('body-parser');
  app = express();
  process.env.NODE_ENV = 'development';
  app.use(bodyParser());

  // Set content type to JSON for all
  app.use(function(req, res, next) {
    res.contentType('application/json');
    next();
  });

  app.get('/', function (err, res, req) {
    res.send(200);
  });

  app.listen(7777);
}).call(this);