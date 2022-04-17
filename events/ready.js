module.exports = (client, interaction) => {
    console.log(`${client.user.tag} ismi ile bot giriş yaptı.`);
    console.log(`Başarılı.`);
    client.user.setPresence({activities: [{name:"Yenileniyor..."}], status:"dnd"});   
};