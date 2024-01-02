const Discord = require('discord.js')
const db = require('quick.db')


module.exports = {
    name: 'prefix',
    aliases: ["setprefix"],
    description:"permet de changer le préfixe du bot",
    run: async (client, message, args, prefix, color) => {

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){


            let newPrefix = args[0]
            if (!args[0]) return
            if (args[1]) return
            if (db.get(`prefix_${message.guild.id}`) === newPrefix) return message.channel.send(`Le prefix est déjà \`${db.get(`prefix_${message.guild.id}`)}\``)
            else {
                db.set(`prefix_${message.guild.id}`, args[0])
                message.channel.send(`Mon prefix est maintenant : \`${args[0]}\``)
            }

        }


    }
}