#!/usr/bin/env node

//This script will add or remove all plugins listed in package.json
//usage: node platforms.js [add | remove]

var command = process.argv[2] || 'add';
var packageJson = require('../package.json');

var fs = require('fs');
var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;

packageJson.cordovaPlatforms.forEach(function(platform) {
    var platformCmd = 'cordova platform ' + command + ' ' + platform;
    exec(platformCmd);
});
