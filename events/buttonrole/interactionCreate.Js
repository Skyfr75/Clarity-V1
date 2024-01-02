const db = require("quick.db")
const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    Message,
    DiscordAPIError,
  } = require("discord.js");
  const Discord = require("discord.js");
module.exports =  async (client, interaction, message) => {

    if (interaction.user.bot) return;

    
    let role = interaction.guild.roles.cache.get(db.get(`buttonmenuconfig_${button.guild.id}`))
    if (interaction.customId === "buttonrole"){
    if (role) {
        if(interaction.member.roles.cache.has(role.id)) {
            interaction.member.roles.remove(role).catch()
        } else if(!interaction.member.roles.cache.has(role.id)) {
            interaction.member.roles.add(role).catch()
        }
    }
    }
}