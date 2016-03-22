#!/usr/bin/env node

var util = require('util');
FileParser = require("./FileParser");
var commander = require('commander');
var chalk = require('chalk');
var Program = require("./Program");
var pjson = require('./package.json');

commander
  .version(pjson.version)
  .description(chalk.yellow("<path> should be the path to a .mcc file or directory containing .mcc files."))
  .usage("<path> [options]")
  .arguments("<path>")
  .action(function(path)
  {
	  Program.PathArg = path
  })
  .option('-o, --output-command', 'Display any combined commands in the console.')
  .option('-d, --debug', 'Display additional debug information in the console.');
  
process.argv[1] = 'one-command';
commander.parse(process.argv);  

Program.Debug = commander.debug; //process.argv[3] == "debug" ? true : false;
Program.OutputCommand = commander.outputCommand; //process.argv[3] == "output-command" ? true : false;

if(Program.PathArg)
{
	Program.ProcessPath();
}

if(!Program.PathFound)
{
	commander.outputHelp();
	console.log(chalk.red.bold("  Please enter the path to a .mcc file or directory containing .mcc files as the first argument."));
}
