const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const ms = require("ms");
const db = require('quick.db')
const owner = new db.table("Owner")
const pga = new db.table("PermGa")
const cl = new db.table("Color")
module.exports = {
    name: "giveaway",
    aliases: ["gstart", "gw"],
    category: "giveaways",
    description: "Créer un giveaway",
    run: async(client, message, args, prefix) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`)  || message.member.roles.cache.has(pga.fetch(`permga_${message.guild.id}`))) {
            let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let time = ms(args[0])
        let prize = args.slice(1).join(" ")
        if (!prize) return message.channel.send("Veuillez fournir un prix!")
        if (!time) return message.channel.send("Veuillez fournir une durée!")
        if (isNaN(time)) return message.channel.send("Veuillez fournir une durée valide!")
        if (time < 0) return message.channel.send("Veuillez fournir une durée valide!")
        if (time > 21600000) return message.channel.send("Veuillez fournir une durée valide!")
        if (isNaN(prize)) return message.channel.send("Veuillez fournir un prix valide!")
        if (prize < 1) return message.channel.send("Veuillez fournir un prix valide!")

                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[3])
                if (!channel) return message.channel.send("Veuillez mentionner un salon valide!")

                // creation du giveaway

                                let giveaway = client.giveawaysManager.giveaways.find(g => g.prize === prize && g.guildID === message.guild.id)
                                if (!giveaway) {
                                    
                                    let embed = new MessageEmbed()
                                  .setColor(color)
                                  .setTitle("Giveaway")
                                  .setDescription(`**${prize}**`)
                                  .setFooter(`Giveaway créé par ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                                  .setTimestamp()
                                }
                                if (giveaway.ended) return message.channel.send("Vous avez déjà terminé ce giveaway!")
                                if (giveaway.winners.length >= 10) return message.channel.send("Vous avez déjà terminé ce giveaway!")
                                if (giveaway.winners.includes(message.author.id)) return message.channel.send("Vous avez déjà terminé ce giveaway!")
                                if (giveaway.ended) return message.channel.send("Vous avez déjà terminé ce giveaway!")
                

        }
    }
}