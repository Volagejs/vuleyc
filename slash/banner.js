const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const axios = require("axios");
module.exports = {
    name:"kullanıcı-afis",
    description: 'Belirtilen kullanıcının afişini gösterir.',
    type:'CHAT_INPUT',
    category:"genel",
    options: [
        {
            name:"kullanıcı",
            description:"Kullanıcı belirtiniz.",
            type:6,
        },
    ],
    run: async (client, interaction) => {
        const veri = interaction.options.getMember('kullanıcı') ? interaction.options.getMember('kullanıcı').user.id : interaction.member.user.id;
       const id = interaction.guild.members.cache.has(veri) ? interaction.guild.members.cache.get(veri).id : interaction.member.user.id
      const adam = interaction.guild.members.cache.get(id)
      
       axios
      .get(`https://discord.com/api/users/${id}`,{
        headers: {
          Authorization: `Bot ${client.token}`,
        },
      })
      .then((res) =>{
        const {banner, accent_color} = res.data;

        if(banner){
          const extention = banner.startsWith("a_") ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/banners/${id}/${banner}${extention}?size=4096`;
          const but = new MessageButton().setLabel("Tarayıcıda Göster").setStyle("LINK").setURL(url)
          const embed = new MessageEmbed()
          .setColor(accent_color)
          .setFooter({text:`${interaction.member.user.tag} tarafından kullanıldı.`,iconURL:interaction.member.user.avatarURL({dynamic:true})})
          .setAuthor({
            name:`${adam.user.username} Banner`, iconURL:adam.user.avatarURL({ dynamic: true, size: 1024 })
          })
          .setImage(url);
            interaction.reply({embeds:[embed],components:[new MessageActionRow().addComponents(but)]});
        }
        else{
          const embed2 = new MessageEmbed().setDescription('Kullanıcıda afiş bulunmuyor.').setColor(accent_color);
          interaction.reply({embeds:[embed2]})
        }
      })
    }
}