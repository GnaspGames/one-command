// ------------------
// --     loop     --
// ------------------
// Usage: !loop <loopName>

var util = require("util");

var Loop = 
{
	Install: function(smelt)
	{
		switch(smelt.settings.Output.MinecraftVersion) 
		{
			case "1.9":
			case "1.10":
				smelt.addSupportModule("smelt-for-1.9.mcc");
				break;
			case "1.11":
			default:
				smelt.addSupportModule("smelt-for-1.11.mcc");
				break;
		}
	},
	Execute: function(smelt)
	{
		var name = smelt.args[0];
		if(name)
		{
			smelt.addCommandBlock(
				util.format("testfor @e[tag=Smelt_SYSTEM] {Tags:[\"loop_%s\"]}", name), 
				{type:"repeating",auto:true,conditional:false}
			);

			smelt.addCommandBlock(
				"searge", 
				{type:"repeating",auto:true,conditional:true}
			);
		}
	}
}

module.exports = Loop;