const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const { MessageEmbed } = require('discord.js')

module.exports = async (client, emoji) => {

    const color = cl.fetch(`color_${emoji.guild.id}`)

    let wass = db.get(`emojilog_${emoji.guild.id}`);
  const logschannel = emoji.guild.channels.cache.get(wass)
  let logs = new MessageEmbed()
  .setAuthor(emoji.guild.name)
  .addField("Emoji crée:", `${emoji}`)
  .addField("Nom de l'emoji:", emoji.name)
  .addField("Emoji ID:", emoji.id)
  .addField("Emoji URL", emoji.url)
  .setFooter({text: ` Clarity ${client.config.version}` })
  .setColor(color)

  if(logschannel) logschannel.send({embeds: [logs]})
}