var fs = require('fs');
var _path = require('path');
var os = require('os');

var Program = require("../Program");

var StartCompiler = 
{
	PathArg : "",
	Path : "",
	PathFound : false,
	ProcessPath : function()
	{
		StartCompiler.Path = _path.resolve(StartCompiler.PathArg);
		var stats = fs.statSync(StartCompiler.Path);
	
		var files = [];
		
		if(stats.isFile())
		{
			Program.LocalDirectory = _path.dirname(StartCompiler.Path);
			files.push(StartCompiler.Path);
		}
		else if(stats.isDirectory())
		{
			Program.LocalDirectory = StartCompiler.Path;
			var fileNames = fs.readdirSync(StartCompiler.Path);
			fileNames.forEach(function(fileName)
			{
				if(fileName.endsWith(".mcc")) 
					files.push(StartCompiler.Path + "\\" + fileName);
			});
		}
		
		files.forEach(function(filePath)
		{
			var fileParser = new FileParser();
			fileParser.ProcessFile(filePath);
			StartCompiler.PathFound = true;
		});
	}
}

module.exports = StartCompiler;