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
    name: "counters",
    description: "Configure les salons compteurs",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        
        
        let menuoptions = new MessageSelectMenu()
                            .setCustomId('MenuSelection')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Modifier un compteur")
                           .addOptions([
                            {
                                label: "Compteur 1",
                                value: "firstcompt",
                                emoji: "1️⃣"
                            },
                            {
                                label: "Compteur 2",
                                value: "secondcompt",
                                emoji: "2️⃣",
                            }, {
                                label: "Compteur 3",
                                value: "thirdcompt",
                                emoji: "3️⃣"
                            }, {
                                label: "Compteur 4",
                                value: "fourthcompt",
                                emoji: "4️⃣"
                            }
                           ])


                           let options = new MessageSelectMenu()
                           .setCustomId('Options')
                           .setMaxValues(1)
                           .setMinValues(1)
                           .setPlaceholder("Configurer le compteur")
                           .addOptions([
                            {
                                label: "Salon",
                                value: "chan",
                                emoji: "🏷️"
                            }, {
                                label: "Compteur de membres",
                                value: "memb",
                                emoji: "🚶‍♂️"
                            }, {
                                label: "Compteur de membres en ligne",
                                value: "membenlin",
                                emoji: "🟢"
                            } , {
                                label: "Compteur de membres en vocal",
                                value: "membenvocal",
                                emoji: "🔊"
                            }, {
                                label: "Compteur de salons",
                                value: "salon",
                                emoji: "📘"
                            }, {
                                label: "Compteur de rôles",
                                value: "role",
                                emoji: "💈"
                            }, {
                                label: "Compteur de membres ayant un rôle",
                                value: "membrole",
                                emoji: "🍀"
                            }, {
                                label: "Compteur de boosts",
                                value: "boost",
                                emoji: "🔮"
                            }, {
                                label: "Format",
                                value: "format",
                                emoji: "⚙️"
                            }
                           ])

                           let button = new MessageButton()
                           button.setCustomId('Createvoice')
                           button.setStyle("PRIMARY")
                           button.setLabel("Créer un salon vocal")
                           button.setEmoji("🔊")

                           let button2 = new MessageButton()
                           button2.setStyle("PRIMARY")
                           button2.setCustomId('Createtext')
                           button.setLabel("Créer un salon textuel")
                           button2.setEmoji("💬")


                           let row = new MessageActionRow()
                           row.addComponents(options)
                           let row2 = new MessageActionRow()
                           row2.addComponents(button, button2)

                           let button3 = new MessageButton()
                           button3.setCustomId('confirm')
                           button3.setStyle("SUCCESS")
                           button3.setLabel("Valide le compteur")
                           button3.setEmoji("✅")

                           let button4 = new MessageButton()
                           button.setCustomId('delete')
                           button.setStyle("DANGER")
                           button.setLabel("Supprime le compteur")
                           button4.setEmoji("❌")

                           let row3 = new MessageActionRow()
                           row3.addComponents(button3, button4)

                           const embed = new MessageEmbed()
        embed.setColor(color)
        embed.setTitle("📊 Paramètre des compteurs")
        embed.addFields({
            name: "**1️⃣ Compteur 1**",
            value: db.get(`firstcompt_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`firstcompt_${message.guild.id}`)}> (${db.get(`firstcompt_${message.guild.id}`)})`,
        }, {
            name: "**2️⃣ Compteur 2**",
            value: db.get(`secondcompt_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`secondcompt_${message.guild.id}`)}> (${db.get(`secondcompt_${message.guild.id}`)})`,
        }, {
            name: "**3️⃣ Compteur 3**",
            value: db.get(`thirdcompt_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`thirdcompt_${message.guild.id}`)}> (${db.get(`thirdcompt_${message.guild.id}`)})`,
        }, {
            name: "**4️⃣ Compteur 4**",
            value: db.get(`fourthcompt_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`fourthcompt_${message.guild.id}`)}> (${db.get(`fourthcompt_${message.guild.id}`)})`,
        })
        embed.setFooter({text:"Les compteurs s'actualisent toutes les 7 minutes, patientez 😉"})
        
                           const menumsg = await message.reply({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                           

                          
                           const collector = menumsg.createMessageComponentCollector({ time: 7 * 60 * 1000 });

                        
                           collector.on("collect", async i => {
                            
                            i.deferUpdate()
                            if (i.user.id !== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser ce menu", ephemeral: true})
                            
                            if (i.customId === "MenuSelection") {
                                if (i.values[0] === "firstcompt") {
                                    
                                    let conf = new MessageEmbed()
                                    conf.setColor(color)
                                    conf.setTitle("Paramètres du compteur 1")
                                    conf.addFields({
                                        name: "**Salon**",
                                        value: db.get(`firstcompt_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`firstcompt_${message.guild.id}`)}> (${db.get(`firstcompt_${message.guild.id}`)})`,
                                    }, {
                                        name: "**Type**",
                                        value: db.get(`firstcompttype_${message.guild.id}`) === null? "Non paramétré" : db.get(`firstcompttype_${message.guild.id}`),
                                    }, {
                                        name: "**Format**",
                                        value: db.get(`firstcomptformat_${message.guild.id}`) === null? "Non paramétré" : db.get(`firstcomptformat_${message.guild.id}`),
                                    })
                                    conf.setFooter({text:"Les compteurs s'actualisent toutes les 7 minutes, patientez 😉"})
                                    message.channel.send({ embeds: [conf], components: [options, row, row2, row3] })
                                    
                                }
                            }
                           })
    }
}