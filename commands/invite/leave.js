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
    name: "leave-settings",
    run : async(client, message, args, prefix) => {


        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){
                let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
                try {


                    first_layer()
                    async function first_layer() {
                        let menuoptions = new MessageSelectMenu()
                            .setCustomId('MenuSelection')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Message Personnalisé",
                                    value: `msgperso`,
                                    emoji: "🈴",
                                },
                                {
                                    label: "Variable pour le mess de leave",
                                    value: "varm"
                                },
                                {
                                    label: 'MP Personnalisé',
                                    value: `mpperso`,
                                    emoji: "💬",
                                },
                                {
                                    label: "Activé le message de leave",
                                    value: "activemodule",
                                    emoji: "✅",
                                },
                                {
                                    label: "Désactivé le message de leave",
                                    value: "desactivemodule",
                                    emoji: "❌",
                                },
                                {
                                    label: "Activé le mp de leave",
                                    value: "activemodulemp",
                                    emoji: "➰",
                                },
                                {
                                    label: "Désactivé le mp de leave",
                                    value: "desactivemodulemp",
                                    emoji: "✖",
                                },
                                {
                                    label: "Channel de leave",
                                    value: "joinchan",
                                    emoji: "🎀"
                                },
                                {
                                    label: 'Annulé',
                                    value: "Cancel",
                                    emoji: '〰',
                                },
                            ])





                        let onoffjoin = db.get(`leavesettings_${message.guild.id}`)
                        if (onoffjoin == true) onoffjoin = "Activé"
                        if (onoffjoin == false) onoffjoin = "Désactivé"
                        if (onoffjoin == null) onoffjoin = "Désactivé"


                        let onoffjoinmp = db.get(`leavesettingsmp_${message.guild.id}`)
                        if (onoffjoinmp == true) onoffjoinmp = "Activé"
                        if (onoffjoinmp == false) onoffjoinmp = "Désactivé"
                        if (onoffjoinmp == null) onoffjoinmp = "Désactivé"

                        let messageleavn = db.get(`messageleav_${message.guild.id}`)
                        if (messageleavn == '[object Object]') messageleavn = "Non configuré"
                        if (messageleavn == null) messageleavn = "Non configuré"

                        let mpjoin = db.get(`messageleavmp_${message.guild.id}`)
                        if (mpjoin == '[object Object]') mpjoin = "Non configuré"
                        if (mpjoin == null) mpjoin = "Non configuré"


                        let salonleav = `<#${db.get(`salonleav_${message.guild.id}`)}>`
                        if (salonleav == "<#null>") salonleav = "Non configuré"

                        const MenuEmbed = new Discord.MessageEmbed()
                            .setTitle('Paramètres de leave')
                            .setDescription(`**Choisissez les options lorsqu'un membre rejoindra le serveur**`)

                            .addFields(
                                { name: 'Activé/Désactivé', value: `Message de leave: **${onoffjoin}**\n MP de leave: **${onoffjoinmp}**` },
                                { name: 'Salon de leave', value: salonleav },
                            )
                            .addFields(
                                { name: 'MP de leave', value: mpjoin, inline: false },
                                { name: 'Message de leave', value: `${messageleavn}`, inline: false },
                            )

                            .setColor(color)
                            .setFooter({ text: `Clarity ${client.config.version}`  })

                        let used1 = false;

                        const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })

                        function menuselection(i) {
                            used1 = true;
                        }

                        //Event
                        let msg = menumsg

                        const antichannel = new MessageEmbed()
                            .setTitle(`Configuré le message de leave`)
                            .setDescription("**Séléctionner l'option qui vous correspond**")
                            .setColor(color)


                        const antichanneldelete = new MessageEmbed()
                            .setTitle(`Configuré le MP de leave`)
                            .setDescription("**Indiquer quel message sera envoyé aux nouveau membres qui rejoindront le serveur**")
                            .setColor(color)



                        let options = new MessageSelectMenu()
                            .setCustomId('MenuOn')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Définir un Message",
                                    value: `active`,
                                    emoji: '✅',
                                },
                                {
                                    label: 'Réinitialiser',
                                    value: `desactive`,
                                    emoji: '❌',
                                },
                                {
                                    label: 'Retour',
                                    value: "Retour",
                                    emoji: "↩️",
                                },
                            ])




                        let AntiChannelDelete = new MessageSelectMenu()
                            .setCustomId('MenuOn')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Définir un Message",
                                    value: `activedel`,
                                    emoji: '✅',
                                },
                                {
                                    label: 'Réinitialiser',
                                    value: `desactivedel`,
                                    emoji: '❌',
                                },
                                {
                                    label: 'Retour',
                                    value: "Retourdel",
                                    emoji: "↩️",
                                },
                            ])


                        let filter2 = (m) => m.author.id === message.author.id

                        let filter1 = (i) => i.user.id === message.author.id;
                        const col = message.channel.createMessageComponentCollector({
                            componentType: "SELECT_MENU",
                            filter: filter1
                        });

                        col.on("collect", async (i) => {
                            i.deferUpdate()
                            if (i.values[0] == "Cancel") {
                                menumsg.delete()
                            }


                            if (i.values[0] === "varm"){
                                const premiumTier = {
                                    NONE: 0,
                                    TIER_1: 1,
                                    TIER_2: 2,
                                    TIER_3: 3,
                                };

                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`Arguments de messages`)
                                    .setDescription(`Exemple de message simple: \`{MemberMention} nous a rejoint,  nous sommes maintenant {MemberCount} sur {Server}\``)
                                    .addFields(
                                        { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Clarity`'},
                                        { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`},
                                        { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Clarity Bot#7646`'},
                                    )
                                    .addFields(
                                        { name: '{MemberID}', value: `L'ID du membre concerné\n\`Exemple: ${message.author.id}\``},
                                        { name: '{MemberCount}', value: `Le nombre total de membres sur le serveurn\n\`Exemple: ${message.guild.memberCount}\``},
                                        { name: '{Server}', value: `Le nom du serveur\n\`Exemple: ${message.guild.name}\``},
                                    )
                                    .addFields(
                                        { name: '{ServerBoostsCount}', value: `Le nombre de boost du serveur\n\`Exemple: ${message.guild.premiumSubscriptionCount || '0'}\``},
                                        { name: '{ServerLevel}', value: `Le niveau actuel du serveur\n\`Exemple: ${premiumTier[message.guild.premiumTier]}\``},
                                        { name: '{VocalMembersCount}', value: `Le nombre total de membres en vocal sur le serveur\n\`Exemple: ${message.guild.members.cache.filter(m => m.voice.channel).size}\``},
                                    )
                                    .addFields(
                                        { name: '{OnlineMembersCount}', value: `Le nombre total de membres en ligne sur le serveur\n\`Exemple: ${message.guild.presences.cache.filter((presence) => presence.status !== "offline").size}\``},
                                    )
                                    .addFields(
                                        {name: '{InviterMention}', value: `Mentionne La personne qui a inviter\n\`Exemple:\` <@${message.author.id}>`},
                                        {name: '{Inviter}', value: `Le nom de la personne qui a invitern\n\`Exemple: Clarity\``},
                                        {name: '{Invite}', value: "Donne le lien d'invitation utiliser\n\`Exemple: clarity\`"}
                                    )
                                    .setColor(color)
                                    .setFooter({text: `Clarity ${client.config.version}` })


                                message.reply({ embeds: [embed] })
                            }

                            else if (i.values[0] == "joinchan") {

                                const ez = await message.channel.send(`Quel est le channel de leave?(id)`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        }).then(collected => {


                            var msg = collected.first();

                            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(msg.content || message.channelId);
                if (msg.content == undefined) msg.content = `<#${message.channel.id}>`


                            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
                            if (db.get(`salonleav_${message.guild.id}`) === newChannel) return message.channel.send(`Nouveau salon de leave : \`${db.get(`salonleav_${message.guild.id}`)}\``)
                            else {
                                db.set(`salonleav_${message.guild.id}`, newChannel.id)
                                message.channel.send(`Nouveau salon de leave : ${msg.content}`)

                                const logs = db.get(`salonleav_${message.guild.id}`)

                                const embed = new Discord.MessageEmbed()
                                    .setColor(color)
                                    .setTitle(`${message.author.tag} à défini ce salon comme salon de leave`)
                                    .setDescription(` Ce salon est désormais utilisé pour toutes les **arrivées** du serveur\n Executeur : <@${message.author.id}>`)
                                    .setTimestamp()
                                    .setFooter({ text: `Clarity ${client.config.version}`  })
                                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)



                            }

                            ez.delete()
                            collected.first().delete()
                        })
                            }
                            else if (i.values[0] === "msgperso") {
                                menumsg.edit({ embeds: [antichannel], components: [new MessageActionRow().addComponents([options])] })

                            }
                            if (i.values[0] == "active") {
                                let link = db.fetch(`messageleav_${message.guild.id}`)
                                if (link == true) {
                                    message.channel.send(`✅ |\`Un message \` est déjà setup`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);

                                }
                                else {

                                    const oui = await message.channel.send(`Quel message doit être envoyé dans le salon de leave lorsqu'un membre quittera le serveur `)
                                    let collected = message.channel.awaitMessages({
                                        filter: m => m.author.id === message.author.id,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    })
                                        .then(collected => {
                                            oui.delete()

                                            const status = collected.first().content
                                            db.set(`messageleav_${message.guild.id}`, status)
                                            collected.first().delete()

                                            message.channel.send(`✅ |\`Le module message de leave \` a été activé avec succès`).then(msg => {
                                                setTimeout(() => msg.delete(), 60000)
                                            }).catch(console.error);
                                        })
                                }

                            } else if (i.values[0] == "Retour") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })


                            } else if (i.values[0] == 'desactive') {
                                let link = db.fetch("msgperso_" + message.guild.id)
                                if (link == true) {
                                    //     db.set("support"+ message.guild.id , null)
                                    db.delete("messageleav_" + message.guild.id)
                                    message.channel.send(`❌ |\`Le message de leave \` vient d'être reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);


                                } else if (link == null) {
                                    message.channel.send(`❌ |\`Le message de leave \` est déjà reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);

                                }

                            }

                            //Statut
                            else if (i.values[0] === "mpperso") {
                                menumsg.edit({ embeds: [antichanneldelete], components: [new MessageActionRow().addComponents([AntiChannelDelete])] })

                            } if (i.values[0] == "activedel") {

                                let link = db.fetch(`messageleavmp_${message.guild.id}`)
                                if (link == true) {
                                    message.channel.send(`✅ |\`Les de mp de leave \` sont déjà activés`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);
                                } else {

                                    const ez = await message.channel.send(`Quel message doit être envoyé aux membres qui rejoindront le serveur `)
                                    let collected = await message.channel.awaitMessages({
                                        filter: filter2,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    }).then(collected => {
                                        ez.delete()

                                        const status = collected.first().content
                                        db.set(`messageleavmp_${message.guild.id}`, status)
                                        //  db.set("support"+ message.guild.id , true)
                                        message.channel.send(`✅ |\`Le mp de leave à été set up \`Message: ${status}`).then(msg => {
                                            setTimeout(() => msg.delete(), 10000)
                                        })
                                        collected.first().delete()
                                            .catch(console.error);
                                    })
                                }
                            } else if (i.values[0] == "Retourdel") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })


                            } else if (i.values[0] == 'desactivedel') {
                                let link = db.fetch(`support${message.guild.id}`)
                                if (link == true) {
                                    db.delete('status' + message.guild.id)
                                    message.channel.send(`❌ |\`Le mp de leave \` vien d'être reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);



                                } else {
                                    message.channel.send(`❌ |\`Le mp de leave \` est déjà reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);

                                }
                            }


                            //activé MSG
                            if (i.values[0] === "activemodule") {

                                let soutien = db.fetch("leavesettings_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le module de join est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else {
                                    db.set("leavesettings_" + message.guild.id, true)
                                    return message.channel.send("✅ |Le module de join vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodule") {

                                let soutien = db.fetch("leavesettings_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("leavesettings_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le module de join vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else return message.channel.send('✅ | Le module de join est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 60000)
                                })
                            }

                            //activé mp
                            if (i.values[0] === "activemodulemp") {

                                let soutien = db.fetch("leavesettingsmp_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le module de join est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else {
                                    db.set("leavesettingsmp_" + message.guild.id, true)
                                    return message.channel.send("✅ |Le module de join vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodulemp") {

                                let soutien = db.fetch("leavesettingsmp_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("leavesettingsmp_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le module de join vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else return message.channel.send('✅ | Le module de join est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 60000)
                                })
                            }

                        })
                    }
                } catch (err) {
                    console.log(err)
                }

        }
    }
}