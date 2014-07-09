/*
* Copyright (c) MyTeksi GrabTaxi 2014
* Author: Fadrizul Hasani <fadrizul@grabtaxi.com>
* Date: 2014-07-10 02:40:27
* Modified by: fadrizul
* Modified time: 2014-07-10 03:28:27
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

  // Enabling clustering
  var cluster = require('cluster');
  var http = require('http');
  var numCPUs = require('os').cpus().length;

  if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', function(deadWorker, code, signal) {
      // Restart the worker
      var worker = cluster.fork();

      // Note the process IDs
      var newPID = worker.process.pid;
      var oldPID = deadWorker.process.pid;

      // Log the event
      console.log('worker ' + oldPID + ' died.');
      console.log('worker ' + newPID + ' born.');
    });
  } else {
    // Workers can share any TCP connection
    app.listen(7777);
    console.log("Server is now listening on port " + 7777);
  }
}).call(this);