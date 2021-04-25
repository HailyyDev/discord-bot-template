  
const Discord = require('discord.js');
module.exports = {
   name: "kick",
   aliases: ["k"],
   timeout: 3000,
   run: async(client, message, args) => {
     if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I do not have the **Kick Members** permission. Please make sure you enable it so I can run this command.");
     if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You do not have the **Kick Members** permission.")
     
     let user = message.mentions.members.first();
     if (!user) return message.channel.send("That is not a valid user!");
     
     let reason = args.slice(1).join(" ");
     if (!reason) return message.channel.send("I do not see a reason.");
     
     let kicked = new Discord.MessageEmbed()
     .setDescription(`Successfully kicked ${user} for the reason of: \`${reason}\`.`)
     .setColor("GREEN")
     .setTimestamp()
     .setFooter("Successful", bot.user.displayAvatarURL({ dynamic : true }))
      
     try {
        user.kick({ reason: reason });
        message.channel.send(kicked).then(sent => {
            sent.react("✅");
        });
     } catch (e) {
         console.log(e)
     }
   }
}
