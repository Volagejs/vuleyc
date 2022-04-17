const { Permissions, MessageEmbed } = require("discord.js");
module.exports = {
    name:"Yardım",
    description: 'Yardım',
    type:'CHAT_INPUT',
    options:[],
    run: async (client, interaction) => {

        
          const embed = new MessageEmbed()
            .setAuthor({
                name: "Light Bot",
                iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
            })
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 1024 }))
            .addField("Kullanıcı Avatar", "`/avatar <kullanıcı>`", false)
            .addField("Kullanıcı Afiş", "`/kullanıcı-afis <kullanıcı>`", false)
            .addField("Kullanıcı Bilgi", "`/kullanıcı-bilgi <kullanıcı>`", false)
            .addField("Sunucu Hakkında Bilgi", "`/sunucu-bilgi`", false)
            .setColor("#2ACAEA");

        interaction.reply({ embeds: [embed] });
           
  }
};