const Discord = require('discord.js')
const db = require('quick.db')
const messlog = new db.table("messlog")
const cl = new db.table("Color")
module.exports = {
    name: 'messlog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        messlog.set(`${message.guild.id}.logmess`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs de messages`)

        
    }

    else if(args[0] === "off") {
        messlog.set(`${message.guild.id}.logmess`,null)
        message.channel.send(`Logs de messages désactivés`)
        
    } else 
         if(ss) {
        messlog.set(`${message.guild.id}.logmess`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs de messages`)


        const logs = messlog.get(`${message.guild.id}.logmess`)

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs de messages`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs de messages** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `Clarity ${client.config.version}`  })
    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
    }


           
    
    
    }
    }
