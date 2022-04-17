const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name:"avatar",
    description: 'Avatarı gösterir.',
    type:'CHAT_INPUT',
    category:"genel",
    options: [
        {
            name:"kullanıcı",
            description:"Kullanıcıyı belirtiniz.",
            type:6,
        },
        {
            name:"format",
            type:3,
            description:"Resmin formatını seçiniz.",
            choices:[
                {name:"Gif",value:"gif"},
                {name:"Png",value:"png"}
            ]
        },
        {
            name:"boyut",
            type:3,
            description:"Resmin boyutunu seçiniz.",
            choices:[
                {name:"1024px",value:"1024"},
                {name:"2048px",value:"2048"}
            ]
        },
        
    ],
    run: async (client, interaction) => {
        const veri = interaction.options.getMember('kullanıcı') ? interaction.options.getMember('kullanıcı').user.id : interaction.member.user.id;
       const id = interaction.guild.members.cache.has(veri) ? interaction.guild.members.cache.get(veri).id : interaction.member.user.id
        const tür = interaction.options.get("format") ? interaction.options.get("format").value : "png"
        const oran = interaction.options.get("boyut") ? interaction.options.get("boyut").value : "1024"
        const url = `https://cdn.discordapp.com/avatars/${id}/${interaction.guild.members.cache.get(veri).user.avatar}.${tür}?size=${oran}`;
        try{
       
            const embed = new MessageEmbed()
        .setImage(url)
        .setFooter({
            text:`${interaction.member.user.tag} tarafından kullanıldı.`,
            iconURL: interaction.member.user.avatarURL({dynamic:true})
        })

        const buton = new MessageButton()
        .setLabel("Tarayıcıda aç")
        .setStyle("LINK")
        .setURL(url)

        interaction.reply({embeds:[embed], components:[new MessageActionRow().addComponents(buton)]});
        }
        catch{
            interaction.reply({content:"Kullanıcı bulunamadı."})
        }
    }
}