exports.run = async (client, message, args) => {
  
    if(!message.member.roles.cache.some(r=>["🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé`+"<@" + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion de cette commande.`);

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member) return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    
    if (member.user.bot)
        return message.channel.send("Impossible de bannir un bot !");

    if(member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send("Impossible de bannir un modérateur !");
  
    if(!member.bannable)
        return message.channel.send("Je ne ne peux pas bannir cette utilisateur, Ais-je la permissions nécessaire ? Suis-je assez haut ?");

    let reason = args.slice(1).join(' ');
        if(!reason) reason = "Tu as commis une infraction, un modérateur t'a donc bannis";
    
    const banned = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
        client.users.cache.get(banned);
          banned.send(`Tu as été bannis par ${message.author.tag} ===> ${reason}`);
    
    await member.ban(reason)
        .catch(error => message.channel.send(`Désolé, je ne peux pas bannir cette utilisateur à cause de : ${error}`));
  
    const channel = client.channels.cache.get("616407988504363029");
        channel.send(`${member.user.tag} a été bannis par ${message.author.tag}`);

  const logs = client.channels.cache.get("𝐦𝐨𝐝-𝐥𝐨𝐠𝐬");
      if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        message.guild.channel.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
  }
    
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
      console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
  }

  
}
