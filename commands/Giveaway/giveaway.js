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

        // prepariation de la commande giveaway qu'on configurera avec un selectmenu les options : prix , nombre de gagnants, temps du giveaway, salon , rôles obligatoire , serveur obligatoire , gagnants prédéfinie , émoji , vocal obligatoire , mute/sourdine interdit(voc requis) , salons interdit(voc requis), utilisateurs blacklist, rôles blacklist , statut obligatoire , boosteur obligatoire , invitation minimum , couleur

       let embed = new MessageEmbed()
       embed.setColor(color)
       embed.setTitle(`${client.user.username} - Panel des Giveaways`)
       embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
       embed.addFields({
        name: "\`🎁\` Prix",
        value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`👥\` Nombre de gagnants",
        value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🕐\` Temps du giveaway",
        value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
        inline: true
    }, {
        name: "\`📺\` Salon",
        value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "-" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
        inline: true
    }, {
        name: "\`📲\` Rôles obligatoire",
        value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🌐\` Serveur obligatoire",
        value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🙋‍♂️\` Gagnants prédéfinie",
        value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🎉\` Émoji",
        value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`📡\` Vocal obligatoire",
        value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🤖\` Mute/Sourdine interdit",
        value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🔑\` Salons interdit",
        value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`❌\` Utilisateurs blacklist",
        value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🚫\` Rôles blacklist",
        value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`🔎\` Statut obligatoire",
        value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`💎\` Boosteur obligatoire",
        value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
        inline: true
    }, {
        name: "\`📩\` Invitation minimum",
        value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
        inline: true
    })


        let options = new MessageSelectMenu()
        options.setCustomId("options")
        options.setPlaceholder("Sélectionner une option")
        options.addOptions([
            {
                label: "Prix",
                description: "Un prix",
                value: "prix",
                emoji: "🎁"
            }, {
                label: "Nombre de gagnants",
                description: "Un nombre de gagnants",
                value: "nombre",
                emoji: "👥"
            }, {
                label: "Temps du giveaway",
                description: "Un temps du giveaway",
                value: "temps",
                emoji: "🕐"
            }, {
                label: "Salon",
                description: "Un salon",
                value: "salon",
                emoji: "📺"
            }, {
                label: "Rôles obligatoire",
                description: "Un rôles obligatoire",
                value: "roles",
                emoji: "📲"
            }, {
                label: "Serveur obligatoire",
                description: "Un serveur obligatoire",
                value: "serveur",
                emoji: "🌐"
            }, {
                label: "Gagnants prédéfinie",
                description: "Un gagnants prédéfinie",
                value: "gagnants",
                emoji: "🙋‍♂️"
            }, {
                label: "Émoji",
                description: "Un emoji",
                value: "emoji",
                emoji: "🎉"
            }, {
                label: "Vocal obligatoire",
                description: "Un vocal obligatoire",
                value: "vocal",
                emoji: "🤖"
            }, {
                label: "Mute/Sourdine interdit",
                description: "Un mute/sourdine interdit",
                value: "mute",
                emoji: "🔑"
            },{
                label: "Salons interdit",
                description: "Un salons interdit",
                value: "salons",
                emoji: "🔎"
            },{
                label: "Utilisateurs blacklist",
                description: "Un utilisateurs blacklist",
                value: "utilbl",
                emoji: "❌"
            },
             {
                label: "Rôles blacklist",
                description: "Un rôles blacklist",
                value: "rolesbl",
                emoji: "🚫"
            },  {

                label: "Statut obligatoire",
                description: "Un statut obligatoire",
                value: "statut",
                emoji: "📡"
            } , {
                label: "Boosteur obligatoire",
                description: "Un boosteur obligatoire",
                value: "boost",
                emoji: "💎"
            } , {
                label: "Invitation minimum",
                description: "Un invitation minimum",
                value: "invmin",
                emoji: "📩"
            }
        ])

        let row = new MessageActionRow()
        row.addComponents(options)


            let confirm = new MessageButton()
            confirm.setStyle("SECONDARY")
            confirm.setLabel("✅ | Lancer")
            confirm.setCustomId("start")

            let row2 = new MessageActionRow()
            row2.addComponents(confirm)

            let msgg = await message.channel.send({embeds: [embed], components: [row, row2]})


            let collector = msgg.createMessageComponentCollector({
            })

            collector.on("collect", async (i) => {
                if (i.user.id !== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser cette intéraction.", ephemeral: true})
                i.deferUpdate()
                if (i.customId === "options") {
                    if (i.values[0] === "prix") {
                        const question = await message.channel.send({content: "Veuillez saisir le prix du giveaway"})
                        let collected = await message.channel.awaitMessages({
                            filter: (m) => m.author.id === message.author.id,
                            max: 1,
                            time: 30000
                        }).then(collected => {
                            question.delete()
                           let msg = collected.first().content
                           let price = msg
                           if (!msg) return message.channel.send({content: "Veuillez saisir le prix du giveaway"})


                            db.set(`giveawaysPrice_${message.guild.id}`, price)
                            message.channel.send({content: `Le prix du giveaway est désormais **${price}**`, ephemeral: true})
                            let embed = new MessageEmbed()
                            embed.setColor(color)
                            embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                            embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                            embed.addFields({
                                name: "\`🎁\` Prix",
                                value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`👥\` Nombre de gagnants",
                                value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🕐\` Temps du giveaway",
                                value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                                inline: true
                            }, {
                                name: "\`📺\` Salon",
                                value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                                inline: true
                            }, {
                                name: "\`📲\` Rôles obligatoire",
                                value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🌐\` Serveur obligatoire",
                                value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🙋‍♂️\` Gagnants prédéfinie",
                                value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🎉\` Émoji",
                                value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`📡\` Vocal obligatoire",
                                value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🤖\` Mute/Sourdine interdit",
                                value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🔑\` Salons interdit",
                                value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`❌\` Utilisateurs blacklist",
                                value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🚫\` Rôles blacklist",
                                value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🔎\` Statut obligatoire",
                                value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`💎\` Boosteur obligatoire",
                                value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`📩\` Invitation minimum",
                                value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🎨\` Couleur",
                                value: db.get(`giveawaysColor_${message.guild.id}`) === null? "Blurple": `${db.get(`giveawaysColor_${message.guild.id}`)}`,
                                inline: true
                            })
                            msgg.edit({embeds: [embed]})

                    })
                    } else if (i.values[0] === "salon") {
                        const question = await message.channel.send({content: "Veuillez saisir le salon du giveaway"})
                        let collected = await message.channel.awaitMessages({
                            filter: (m) => m.author.id === message.author.id,
                            max: 1,
                            time: 30000
                            }).then(collected => {
                            question.delete()
                           let msg = collected.first()
                           let channel = msg.mentions.channels.first() || message.guild.channels.cache.get(msg.content)

                            db.set(`giveawaysChannel_${message.guild.id}`, channel.id)
                            message.channel.send({content: `Le salon du giveaway est désormais **${channel}**`, ephemeral: true})
                            let embed = new MessageEmbed()
                            embed.setColor(color)
                            embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                            embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                            embed.addFields({
                                name: "\`🎁\` Prix",
                                value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`👥\` Nombre de gagnants",
                                value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🕐\` Temps du giveaway",
                                value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                                inline: true
                            }, {
                                name: "\`📺\` Salon",
                                value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                                inline: true
                            }, {
                                name: "\`📲\` Rôles obligatoire",
                                value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🌐\` Serveur obligatoire",
                                value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🙋‍♂️\` Gagnants prédéfinie",
                                value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🎉\` Émoji",
                                value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`📡\` Vocal obligatoire",
                                value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🤖\` Mute/Sourdine interdit",
                                value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🔑\` Salons interdit",
                                value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`❌\` Utilisateurs blacklist",
                                value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🚫\` Rôles blacklist",
                                value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🔎\` Statut obligatoire",
                                value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`💎\` Boosteur obligatoire",
                                value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`📩\` Invitation minimum",
                                value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                                inline: true
                            })
                            msgg.edit({embeds: [embed]})

                })
            }
            else if (i.values[0] === "nombre") {
                const question = await message.channel.send({content: "Veuillez saisir le nombre de gagnants du giveaway"})
                let collected = await message.channel.awaitMessages({
                    filter: (m) => m.author.id === message.author.id,
                    max: 1,
                    time: 30000
                    }).then(collected => {
                    question.delete()
                   let msg = collected.first()
                   let gagnants = parseInt(msg)
                   db.set(`giveawaysGagnants_${message.guild.id}`, gagnants)
                   message.channel.send({content: `Le nombre de gagnants du giveaway est désormais **${gagnants}**`, ephemeral: true})
                   let embed = new MessageEmbed()
                   embed.setColor(color)
                   embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                   embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                   embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                    msgg.edit({embeds: [embed]})
                    })
            } else if (i.values[0] === "temps") {
                const question = await message.channel.send({content: "Veuillez saisir le temps du giveaway"})
                let collected = await message.channel.awaitMessages({
                    filter: (m) => m.author.id === message.author.id,
                    max: 1,
                    time: 30000
                    }).then(async collected => {
                    question.delete()
                   let msg = collected.first()



                    if (!msg.content.endsWith("s") &&!msg.content.endsWith("m") &&!msg.content.endsWith("h") &&!msg.content.endsWith("d")) return message.channel.send({content: "Veuillez saisir un temps valide", ephemeral: true})





                   db.set(`giveawaysTime_${message.guild.id}`, ms(msg.content.replace("j", "d")))
                   message.channel.send({content: `Le temps du giveaway est désormais **${msg}**`, ephemeral: true})
                   let embed = new MessageEmbed()
                   embed.setColor(color)
                   embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                   embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                   embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})


            })
        } else if (i.values[0] === "roles") {
            const question = await message.channel.send({content: "Veuillez saisir un rôle obligatoire du giveaway"})
            let collected = await message.channel.awaitMessages({
                filter: (m) => m.author.id === message.author.id,
                max: 1,
                time: 30000
                }).then(async collected => {
                question.delete()
               let msg = collected.first()

               let role = msg.mentions.roles.first() || message.guild.roles.cache.get(msg.content)
               if (!role) return message.channel.send({content: "Veuillez saisir un rôle valide", ephemeral: true})

               db.add(`giveawaysRoles_${message.guild.id}`, role.id)
               message.channel.send({content: `Le rôle **${role.name}** a été ajouté à la liste des rôles obligatoire`, ephemeral: true})
               let embed = new MessageEmbed()
               embed.setColor(color)
               embed.setTitle(`${client.user.username} - Panel des Giveaways`)
               embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
               embed.addFields({
                   name: "\`🎁\` Prix",
                   value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`👥\` Nombre de gagnants",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🕐\` Temps du giveaway",
                   value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                   inline: true
               }, {
                   name: "\`📺\` Salon",
                   value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                   inline: true
               }, {
                   name: "\`📲\` Rôles obligatoire",
                   value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🌐\` Serveur obligatoire",
                   value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🙋‍♂️\` Gagnants prédéfinie",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🎉\` Émoji",
                   value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📡\` Vocal obligatoire",
                   value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🤖\` Mute/Sourdine interdit",
                   value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔑\` Salons interdit",
                   value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`❌\` Utilisateurs blacklist",
                   value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🚫\` Rôles blacklist",
                   value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔎\` Statut obligatoire",
                   value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`💎\` Boosteur obligatoire",
                   value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📩\` Invitation minimum",
                   value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                   inline: true
               })
               msgg.edit({embeds: [embed]})
                })
        } else if (i.values[0] === "server") {
            const question = await message.channel.send({content: "Veuillez saisir un serveur obligatoire du giveaway"})
            let collected = await message.channel.awaitMessages({
                filter: (m) => m.author.id === message.author.id,
                max: 1,
                time: 30000
                }).then(async collected => {
                question.delete()
               let msg = collected.first()

               db.add(`giveawaysServer_${message.guild.id}`, msg.content)
               message.channel.send({content: `Le serveur **${msg.content}** a été ajouté à la liste des serveurs obligatoire`, ephemeral: true})
               let embed = new MessageEmbed()
               embed.setColor(color)
               embed.setTitle(`${client.user.username} - Panel des Giveaways`)
               embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
               embed.addFields({
                   name: "\`🎁\` Prix",
                   value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`👥\` Nombre de gagnants",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🕐\` Temps du giveaway",
                   value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                   inline: true
               }, {
                   name: "\`📺\` Salon",
                   value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                   inline: true
               }, {
                   name: "\`📲\` Rôles obligatoire",
                   value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🌐\` Serveur obligatoire",
                   value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🙋‍♂️\` Gagnants prédéfinie",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🎉\` Émoji",
                   value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📡\` Vocal obligatoire",
                   value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🤖\` Mute/Sourdine interdit",
                   value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔑\` Salons interdit",
                   value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`❌\` Utilisateurs blacklist",
                   value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🚫\` Rôles blacklist",
                   value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔎\` Statut obligatoire",
                   value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`💎\` Boosteur obligatoire",
                   value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📩\` Invitation minimum",
                   value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                   inline: true
               })
               msgg.edit({embeds: [embed]})
                })
        } else if (i.values[0] === "gagnants"){
            const question = await message.channel.send({content: `Il y a t'il des gagnants prédéfinis ? Si il y en a plusieurs séparer les par un /.
            \`id1\` / \`id2\` / \`id3\`
            Pour désactiver les gagnant(s) imposé envoyer \`non\``})
            let collected = await message.channel.awaitMessages({
                filter: (m) => m.author.id === message.author.id,
                max: 1,
                time: 30000
                }).then(async collected => {
                question.delete()
               let msg = collected.first()

               let users = msg.content.split(" ")

               let id1 = users[0]
               let id2 = users[1]
               let id3 = users[2]

               // on fait une variable qui regroupe tout les id

               let allid = [id1, id2, id3]

               db.add(`giveawaysGagnants_${message.guild.id}`, allid)
               message.channel.send({content: `Le gagnant **${allid}** a été ajouté à la liste des gagnants obligatoire`, ephemeral: true})
               let embed = new MessageEmbed()
               embed.setColor(color)
               embed.setTitle(`${client.user.username} - Panel des Giveaways`)
               embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
               embed.addFields({
                   name: "\`🎁\` Prix",
                   value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`👥\` Nombre de gagnants",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🕐\` Temps du giveaway",
                   value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                   inline: true
               }, {
                   name: "\`📺\` Salon",
                   value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                   inline: true
               }, {
                   name: "\`📲\` Rôles obligatoire",
                   value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🌐\` Serveur obligatoire",
                   value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🙋‍♂️\` Gagnants prédéfinie",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🎉\` Émoji",
                   value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📡\` Vocal obligatoire",
                   value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🤖\` Mute/Sourdine interdit",
                   value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔑\` Salons interdit",
                   value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`❌\` Utilisateurs blacklist",
                   value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🚫\` Rôles blacklist",
                   value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔎\` Statut obligatoire",
                   value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`💎\` Boosteur obligatoire",
                   value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📩\` Invitation minimum",
                   value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                   inline: true
               })
               msgg.edit({embeds: [embed]})

            })


        } else if(i.values[0] === "emoji") {
            const question = await message.channel.send({content: "Veuillez saisir l'emoji du giveaway"})
            let collected = await message.channel.awaitMessages({
                filter: (m) => m.author.id === message.author.id,
                max: 1,
                time: 30000
                }).then(async collected => {
                question.delete()
               let msg = collected.first()

               db.set(`giveawaysEmoji_${message.guild.id}`, msg.content)
               message.channel.send({content: `Le emoji **${msg.content}** a été défini en tant qu'emoji pour le giveaway`, ephemeral: true})
               let embed = new MessageEmbed()
               embed.setColor(color)
               embed.setTitle(`${client.user.username} - Panel des Giveaways`)
               embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
               embed.addFields({
                   name: "\`🎁\` Prix",
                   value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`👥\` Nombre de gagnants",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🕐\` Temps du giveaway",
                   value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                   inline: true
               }, {
                   name: "\`📺\` Salon",
                   value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                   inline: true
               }, {
                   name: "\`📲\` Rôles obligatoire",
                   value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🌐\` Serveur obligatoire",
                   value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🙋‍♂️\` Gagnants prédéfinie",
                   value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🎉\` Émoji",
                   value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📡\` Vocal obligatoire",
                   value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🤖\` Mute/Sourdine interdit",
                   value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔑\` Salons interdit",
                   value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`❌\` Utilisateurs blacklist",
                   value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🚫\` Rôles blacklist",
                   value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`🔎\` Statut obligatoire",
                   value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`💎\` Boosteur obligatoire",
                   value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                   inline: true
               }, {
                   name: "\`📩\` Invitation minimum",
                   value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                   inline: true
               })
               msgg.edit({embeds: [embed]})

        })
    } else if(i.values[0] === "vocal") {
        const question = await message.channel.send({content: "Être en vocal est t'il obligatoire \`oui\` ou \`non\`"})
        let collected = await message.channel.awaitMessages({
            filter: (m) => m.author.id === message.author.id,
            max: 1,
            time: 30000
            }).then(async collected => {

                let msg = collected.first()

                if (msg.content.toLowerCase() === "oui") {
                    question.delete()
                    db.set(`giveawaysVocal_${message.guild.id}`, msg.content)


                let embed = new MessageEmbed()
                embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})
            }
            else if (msg.content.toLowerCase() === "non") {
                question.delete()
                db.set(`giveawaysVocal_${message.guild.id}`, null)


                let embed = new MessageEmbed()
                embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})
            }

            })
    } else if(i.values[0] === "mute") {
        const question = await message.channel.send({content: `Faut t'il ne pas être mute en vocal ?\` oui\` ou \`non\`
        Ce paramétre sera pris en compte seulement si être en vocal est obligatoire.`})
        let collected = await message.channel.awaitMessages({
            filter: m => m.author.id === message.author.id,
            max: 1,
            time: 30000
        })
        if (collected.first().content.toLowerCase() === "oui") {
            question.delete()
            db.set(`giveawaysMute_${message.guild.id}`, "oui")
           let embed = new MessageEmbed()
            embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})
            }
            else if (collected.first().content.toLowerCase() === "non") {
                question.delete()
                db.set(`giveawaysMute_${message.guild.id}`, null)
                let embed = new MessageEmbed()
                embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})
            }



    } else if(i.values[0] === "salons") {
        const question = await message.channel.send({content: "Veuillez saisir les salon interdit"})
        let collected = await message.channel.awaitMessages({
            filter: m => m.author.id === message.author.id,
            max: 5,
            time: 30000
        }).then(collected => {
            let msg = collected.first().content
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(msg)
            if (!channel) return message.channel.send({content: "Veuillez saisir un salon interdit"})
            db.set(`giveawaysSalons_${message.guild.id}`, channel.id)
            let embed = new MessageEmbed()
            embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})
        })
    } else if(i.values[0] === "utilbl") {
        const question = await message.channel.send({content: "Veuillez saisir les utilisateurs blacklist"})
        let collected = await message.channel.awaitMessages({
            filter: m => m.author.id === message.author.id,
            max: 5,
            time: 30000
            }).then(collected => {
                let msg = collected.first().content
                let user = message.mentions.users.first() || message.guild.members.cache.get(msg)
                if (!user) return message.channel.send({content: "Veuillez saisir au moins un utilisateur"})

                db.set(`giveawaysUtilbl_${message.guild.id}`, user.id)

                let embed = new MessageEmbed()
            embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})

            })
    } else if(i.values[0] === "rolesbl") {
        const question = await message.channel.send({content: "Veuillez saisir les roles blacklist"})
        let collected = await message.channel.awaitMessages({
            filter: m => m.author.id === message.author.id,
            max: 5,
            time: 30000
            }).then(collected => {
                let msg = collected.first().content
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(msg)


                db.set(`giveawaysRolesbl_${message.guild.id}`, role.id)
                let embed = new MessageEmbed()
            embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})
            })
        } else if(i.values[0] === "statut") {
            const question = await message.channel.send({content: "Veuillez saisir le statut obligatoire"})
            let collected = await message.channel.awaitMessages({
                filter: m => m.author.id === message.author.id,
                max: 5,
                time: 30000
                }).then(collected => {
                    let msg = collected.first().content
                    let statut = msg.toLowerCase()

                                        db.set(`giveawaysStatut_${message.guild.id}`, statut)

                                        let embed = new MessageEmbed()
            embed.setColor(color)
                embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                embed.addFields({
                    name: "\`🎁\` Prix",
                    value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`👥\` Nombre de gagnants",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🕐\` Temps du giveaway",
                    value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                    inline: true
                }, {
                    name: "\`📺\` Salon",
                    value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                    inline: true
                }, {
                    name: "\`📲\` Rôles obligatoire",
                    value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🌐\` Serveur obligatoire",
                    value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🙋‍♂️\` Gagnants prédéfinie",
                    value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🎉\` Émoji",
                    value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📡\` Vocal obligatoire",
                    value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🤖\` Mute/Sourdine interdit",
                    value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔑\` Salons interdit",
                    value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`❌\` Utilisateurs blacklist",
                    value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🚫\` Rôles blacklist",
                    value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`🔎\` Statut obligatoire",
                    value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`💎\` Boosteur obligatoire",
                    value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                    inline: true
                }, {
                    name: "\`📩\` Invitation minimum",
                    value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                    inline: true
                })
                msgg.edit({embeds: [embed]})
        })
    }
    else if (i.values[0] === "boost") {
        const question = await message.channel.send({content: "Veuillez saisir si boost le serveur est obligatoire"})
        let collected = await message.channel.awaitMessages({
            filter: m => m.author.id === message.author.id,
            max: 5,
            time: 30000
            }).then(collected => {
                let msg = collected.first().content

                if (msg.toLowerCase() === "oui") {
                    db.set(`giveawaysBoost_${message.guild.id}`, "oui")
                    let embed = new MessageEmbed()
                    embed.setColor(color)
                        embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                        embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                        embed.addFields({
                            name: "\`🎁\` Prix",
                            value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`👥\` Nombre de gagnants",
                            value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🕐\` Temps du giveaway",
                            value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                            inline: true
                        }, {
                            name: "\`📺\` Salon",
                            value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                            inline: true
                        }, {
                            name: "\`📲\` Rôles obligatoire",
                            value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🌐\` Serveur obligatoire",
                            value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🙋‍♂️\` Gagnants prédéfinie",
                            value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🎉\` Émoji",
                            value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`📡\` Vocal obligatoire",
                            value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🤖\` Mute/Sourdine interdit",
                            value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🔑\` Salons interdit",
                            value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`❌\` Utilisateurs blacklist",
                            value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🚫\` Rôles blacklist",
                            value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`🔎\` Statut obligatoire",
                            value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`💎\` Boosteur obligatoire",
                            value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                            inline: true
                        }, {
                            name: "\`📩\` Invitation minimum",
                            value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                            inline: true
                        })
                        msgg.edit({embeds: [embed]})
                    }
                    else if (msg.toLowerCase() === "non") {
                        db.set(`giveawaysBoost_${message.guild.id}`, null)
                        let embed = new MessageEmbed()
                        embed.setColor(color)
                            embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                            embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                            embed.addFields({
                                name: "\`🎁\` Prix",
                                value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`👥\` Nombre de gagnants",
                                value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🕐\` Temps du giveaway",
                                value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                                inline: true
                            }, {
                                name: "\`📺\` Salon",
                                value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                                inline: true
                            }, {
                                name: "\`📲\` Rôles obligatoire",
                                value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🌐\` Serveur obligatoire",
                                value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🙋‍♂️\` Gagnants prédéfinie",
                                value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🎉\` Émoji",
                                value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`📡\` Vocal obligatoire",
                                value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🤖\` Mute/Sourdine interdit",
                                value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🔑\` Salons interdit",
                                value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`❌\` Utilisateurs blacklist",
                                value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🚫\` Rôles blacklist",
                                value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`🔎\` Statut obligatoire",
                                value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`💎\` Boosteur obligatoire",
                                value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                                inline: true
                            }, {
                                name: "\`📩\` Invitation minimum",
                                value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                                inline: true
                            })
                            msgg.edit({embeds: [embed]})
                        }
                    })

    } else if(i.values[0] ===  "invmin") {
        let question = await message.channel.send({content: "Veuillez saisir le nombre d'invitations minimum que les participants doivent avoir"})
        let collected = await message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 30000, errors: ['time']}).then(
            collected => {
                let msg = collected.first().content
                let inv = parseInt(msg)

                if (isNaN(inv)) {
                    return message.channel.send("Veuillez saisir un nombre valide")
                } else if (inv < 1) {
                    return message.channel.send("Veuillez saisir un nombre valide")
                }

                db.set(`giveawaysInvmin_${message.guild.id}`, inv)
                let embed = new MessageEmbed()
                embed.setColor(color)
                    embed.setTitle(`${client.user.username} - Panel des Giveaways`)
                    embed.setDescription(`Un total de **${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`}** giveaways sont en cours`)
                    embed.addFields({
                        name: "\`🎁\` Prix",
                        value: db.get(`giveawaysPrice_${message.guild.id}`) === null? "Un prix": `${db.get(`giveawaysPrice_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`👥\` Nombre de gagnants",
                        value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🕐\` Temps du giveaway",
                        value: db.get(`giveawaysTime_${message.guild.id}`) === null? "2h": `${ms(db.get(`giveawaysTime_${message.guild.id}`))}`,
                        inline: true
                    }, {
                        name: "\`📺\` Salon",
                        value: db.get(`giveawaysChannel_${message.guild.id}`) === null? "Non paramétré" : `<#${db.get(`giveawaysChannel_${message.guild.id}`)}>` ,
                        inline: true
                    }, {
                        name: "\`📲\` Rôles obligatoire",
                        value: db.get(`giveawaysRoles_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRoles_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🌐\` Serveur obligatoire",
                        value: db.get(`giveawaysServer_${message.guild.id}`) === null? "-": `${db.get(`giveawaysServer_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🙋‍♂️\` Gagnants prédéfinie",
                        value: db.get(`giveawaysGagnants_${message.guild.id}`) === null? "1": `${db.get(`giveawaysGagnants_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🎉\` Émoji",
                        value: db.get(`giveawaysEmoji_${message.guild.id}`) === null? "🎉": `${db.get(`giveawaysEmoji_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`📡\` Vocal obligatoire",
                        value: db.get(`giveawaysVocal_${message.guild.id}`) === null? "non": `${db.get(`giveawaysVocal_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🤖\` Mute/Sourdine interdit",
                        value: db.get(`giveawaysMute_${message.guild.id}`) === null? "non": `${db.get(`giveawaysMute_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🔑\` Salons interdit",
                        value: db.get(`giveawaysSalons_${message.guild.id}`) === null? "-": `${db.get(`giveawaysSalons_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`❌\` Utilisateurs blacklist",
                        value: db.get(`giveawaysUtilbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysUtilbl_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🚫\` Rôles blacklist",
                        value: db.get(`giveawaysRolesbl_${message.guild.id}`) === null? "-": `${db.get(`giveawaysRolesbl_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`🔎\` Statut obligatoire",
                        value: db.get(`giveawaysStatut_${message.guild.id}`) === null? "non": `${db.get(`giveawaysStatut_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`💎\` Boosteur obligatoire",
                        value: db.get(`giveawaysBoost_${message.guild.id}`) === null? "non": `${db.get(`giveawaysBoost_${message.guild.id}`)}`,
                        inline: true
                    }, {
                        name: "\`📩\` Invitation minimum",
                        value: db.get(`giveawaysInvmin_${message.guild.id}`) === null? "non": `${db.get(`giveawaysInvmin_${message.guild.id}`)}`,
                        inline: true
                    })
                    msgg.edit({embeds: [embed]})
            }
        )

    }
                } else if (i.customId === "start") {
                        
                    // recupere les informations enregistrer pour le giveaway dans les db

                    db.add(`giveawaysCount_${message.guild.id}`, 1)
                    let price = db.fetch(`giveawaysPrice_${message.guild.id}`)
                    let time = db.fetch(`giveawaysTime_${message.guild.id}`)
                    let channel = db.fetch(`giveawaysChannel_${message.guild.id}`)
                    let roles = db.fetch(`giveawaysRoles_${message.guild.id}`)
                    let server = db.fetch(`giveawaysServer_${message.guild.id}`)
                    let emoji = db.fetch(`giveawaysEmoji_${message.guild.id}`)
                    let vocal = db.fetch(`giveawaysVocal_${message.guild.id}`)
                    let mute = db.fetch(`giveawaysMute_${message.guild.id}`)
                    let salons = db.fetch(`giveawaysSalons_${message.guild.id}`)
                    let utilbl = db.fetch(`giveawaysUtilbl_${message.guild.id}`)
                    let rolesbl = db.fetch(`giveawaysRolesbl_${message.guild.id}`)
                    let statut = db.fetch(`giveawaysStatut_${message.guild.id}`)
                    let boost = db.fetch(`giveawaysBoost_${message.guild.id}`)
                    let invmin = db.fetch(`giveawaysInvmin_${message.guild.id}`)
                    let gagnant = db.fetch(`giveawaysGagnants_${message.guild.id}`)

                    // creation de l embed du giveaway
                    let give = new MessageEmbed()
                    give.setColor(color)
                    give.setTitle(`${client.user.username} - Giveaways lancé par ${message.author.username}`)
                    give.setFooter(`Un total de ${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`} giveaways sont en cours`)
                    const a = Date.now() + time
                    const realtime = Math.floor(a / 1000)
                    give.setDescription(`Prix: **${price}**\nTemps: **<t:${realtime}:R>**`)

                    // creation du bouton avec la couleur de la db
                    let button = new MessageButton()
                    .setCustomId("join")
                  .setStyle("SECONDARY")
                  .setEmoji(emoji)
                  .setLabel("Participer")


                  let row = new MessageActionRow()
                  row.addComponents(button)


                  let gchan = message.guild.channels.cache.get(channel)

                  // envoie de l embed et du bouton dans le channel
                   let msg =  await gchan.send({embeds: [give], components: [row]})

                  let collectorx = message.channel.createMessageComponentCollector({ })

                  collectorx.on("collect", async (i) => {
                    i.deferUpdate()

                    if (i.customId === "join") {
                        i.user.send({content: `${i.user.username} vous avez rejoint le giveaway`})
                        let participant = []
                        participant.push(i.user.id)
                        db.add(`giveawaysPartipant_${message.guild.id}`, i.user.id)
                        let participants = db.get(`giveawaysParticipantCount_${message.guild.id}`)
                        let slm = new MessageEmbed()
                        slm.setColor(color)
                        slm.setTitle(`${client.user.username} - Giveaways lancé par ${message.author.username}`)
                        slm.setDescription(`Prix: **${price}**\n **Participants**: ${participant.length}\n`)
                        msg.edit({embeds: [slm]})
                        // le bot change toute les secondes l embed du giveaway avec le temps restant
                        setInterval(() => {
                            let slm = new MessageEmbed()
                            slm.setColor(color)
                            slm.setTitle(`${client.user.username} - Giveaways lancé par ${message.author.username}`)
                            const a = Date.now() + time
                            const realtime = Math.floor(a / 1000)
                            slm.setDescription(`Prix: **${price}**\n **Participants**: **${participant.length}** \n Temps restant: **<t:${realtime}:R>**`)
                            msg.edit({embeds: [slm]})

                        }, 5000)


                    }
                  })


                }
            })
        }
    }
}