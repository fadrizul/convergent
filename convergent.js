/*
* Copyright (c) MyTeksi GrabTaxi 2014
* Author: Fadrizul Hasani <fadrizul@grabtaxi.com>
* Date: 2014-07-10 02:35:58
* Modified by: fadrizul
* Modified time: 2014-07-10 03:39:13
*/

(function () { 'use strict';
  var request = require('request');
  var http = require('http');
  var Agent = require('keep-alive-agent');
  var async = require('async');

  http.globalAgent.maxSockets = 1000;
  var agent = new Agent();
  agent.maxSockets = 10000;

  var options = {
    headers: {
      "Content-Type": "application/json"
    },
    pool: agent
  };

  options.method = 'GET';
  options.uri = 'http://localhost:7777/';

  var error = 0;
  var success = 0;
  var total = 0;
  var level = 1000;
  var interval = 1000;
  var runtime = 10000;

  var execute = function () {
    total = total + 1;
    request(options, function (err, res, body) {
      if (err) {
        error = error + 1;

        return;
      } else {
        if (res.statusCode === 200) {
          success = success + 1;
          return;
        }

        error = error + 1;
        return;
      }
    });
  };

  var store = [];
  for (var i = 0; i < level; i++) {
    store.push(execute);
  }

  console.log('Running ...');
  var intervalProcess = setInterval(function () {
    async.parallel(store);
  }, interval);

  setTimeout(function () {
    clearInterval(intervalProcess);
    console.log('=================================\n Result: \n=================================')
    console.log(' Concurrency level: %s', level);
    console.log(' Runtime: %s ms', runtime);
    console.log(' Interval: %s ms', interval);
    console.log(' Errors: %s', error);
    console.log(' Sucess: %s', success);
    console.log(' Timeout: %s', total - (success + error));
    console.log(' Total requests: %s', total);
  }, runtime);


}).call(this);