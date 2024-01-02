const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);


module.exports = {
    name: "buttonrole",
    description:"permet de configurer un menu de rôle avec des boutons personnalisables, et pour modifier les paramètres d'un menu de rôle existant.",
    run: async(client, message, args, prefix) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){
            const guild = message.guild;
               let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
            try {
        if(db.get(`rolemenustyle_${message.guild.id}`) === "Boutons" || db.get(`rolemenustyle_${message.guild.id}`) === null) {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`Configuration Rolemenu`)
            embed.setColor(color)
            embed.addField("Message", db.get(`rolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`rolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`rolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`rolemenusalon_${message.guild.id}`)}>)`)
            embed.addField("Style", db.get(`rolemenustyle_${message.guild.id}`) === null ? "Réaction" : `${db.get(`rolemenustyle_${message.guild.id}`)}`)
            embed.addField("Rôle", db.get(`rolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`rolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
            embed.addField("Couleur", db.get(`rolemenucolor_${msg.guild.id}`) === null ? bttcolor("blurple") : `${bttcolor(db.get(`rolemenucolor_${msg.guild.id}`))}`)
            embed.addField("Text", db.get(`rolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`rolemenutext_${msg.guild.id}`)}`)
            embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`rolemenubuttonemoji_${msg.guild.id}`)}`)

            let menuoptions = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Choisis une option")
            .addOptions([
                {
                    label: "Modifier le message",
                    value: `mdfm`,
                    emoji: "📝",
                },
                {
                    label: "Modifier le rôle",
                    value: "mdfr",
                    emoji: "👤"
                },   {
                    label: "Modifier la couleur",
                    value: "mdfc",
                    emoji: "🎨"
                },{
                    label: "Modifier le texte",
                    value: "mdft",
                    emoji: "📄"
                },{
                    label: "Supprime le texte",
                    value: "spt",
                    emoji: "🎨"
                },{
                    label: "Modifier l'emoji",
                    value: "mdfe",
                    emoji: "📜"
                },
                {
                    label: "Supprimer l'emoji",
                    value: "mdfc",
                    emoji: "🌟"
                },
                {
                    label: "Validé",
                    value: "confirm",
                    emoji: "✅",
                }, {
                    label: "Reformulé Votre Choix",
                    value: "cancel",
                    emoji: "❌",
                },
               
            ])

            msg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
        }

    } catch (err) {
        console.log(err)
    }
}
}
}