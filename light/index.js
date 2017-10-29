#!/usr/bin/env node

//const express = require('express')
//const app = express()
//const spawn = cmd => child_process.execSync('ssh -p 22222 pi@vigvam.myddns.me light ' + cmd, {encoding: 'utf8'});
//
//app.get('/on', function (req, res) {
//  res.send(spawn('on'))
//})
//
//app.get('/off', function (req, res) {
//  res.send(spawn('off'))
//})
//
//app.get('/status', function (req, res) {
//  res.send(spawn('status'))
//})
//
//app.listen(3003, function () {
//  console.log('Light app listening on port 3000!')
//})

var Proxy = require('http-proxy');
var proxy = Proxy.createProxyServer({target:'http://vigvam.myddns.me:3003'}).listen(3003);

//
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  console.log('Something went wrong. And we are reporting a custom error message.', err);
});

//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.body, true, 2));
});

//
// Listen for the `open` event on `proxy`.
//
//proxy.on('open', function (proxySocket) {
//  // listen for messages coming FROM the target here
//  proxySocket.on('data', hybiParseAndLogMessage);
//});

//
// Listen for the `close` event on `proxy`.
//
proxy.on('close', function (res, socket, head) {
  // view disconnected websocket connections
  console.log('Client disconnected');
});
