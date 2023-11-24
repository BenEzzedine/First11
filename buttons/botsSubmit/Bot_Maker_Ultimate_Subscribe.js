const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const tier3subscriptions = new Database("/database/makers/tier2/subscriptions")
const setting = new Database("/database/settingsdata/setting");
const usersdata = new Database(`/database/usersdata/usersdata`);
const prices = new Database("/database/settingsdata/prices");
const invoices = new Database("/database/settingsdata/invoices");
const tokens = new Database("/tokens/tokens")
let autoline = tokens.get(`Autoline`) || [];
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const path = require('node:path');
const fs = require('node:fs');
const mongodb = require('mongoose');
const ms = require("ms")
;module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {Interaction} interaction
  */
  async execute(interaction){
    if (interaction.isModalSubmit()) {
        if(interaction.customId == "Bot_Maker_Ultimate_Modal_Subscribe") {
            await interaction.deferReply({ephemeral:true})
            let userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
            const Bot_token = interaction.fields.getTextInputValue(`Bot_token`)
            const Bot_prefix = interaction.fields.getTextInputValue(`Bot_prefix`)
            const Server_id = interaction.fields.getTextInputValue(`Server_id`)
            const client3 = new Client({intents: 32767})
            try{
                client3.on("ready" , async() => {
                  const invitebot = new ButtonBuilder()
	.setLabel('دعوة البوت')
	.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client3.user.id}&permissions=8&scope=bot`)
	.setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(invitebot);
                let price1 = prices.get(`bot_maker_ultimate_price_${interaction.guild.id}`)
                if(!price1) {
                  price1 = 250;
                }
                let makers = tier3subscriptions.get(`tier3_subs`)   
                if(!makers) {
                  await tier3subscriptions.get(`tier3_subs` , []) 
                }             
                makers = tier3subscriptions.get(`tier3_subs`)   
                    
                function generateRandomCode() {
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let code = '';
                    for (let i = 0; i < 12; i++) {
                      if (i > 0 && i % 4 === 0) {
                        code += '-';
                      }
                      const randomIndex = Math.floor(Math.random() * characters.length);
                      code += characters.charAt(randomIndex);
                    }
                    return code;
                  }
                  const invoice = generateRandomCode();
                let doneembeduser = new EmbedBuilder()
                .setTitle(`**تم انشاء بوتك بنجاح**`)
                .setDescription(`**معلومات الفاتورة :**`)
                .addFields(
                    {
                        name:`**الفاتورة**`,value:`**\`${invoice}\`**`,inline:false
                    },
                    {
                        name:`**نوع البوت**`,value:`**\`اشتراك بوت ميكر التيميت لمدة شهر\`**`,inline:false
                    },
                    {
                        name:`**ايدي السيرفر**`,value:`**\`${Server_id}\`**`,inline:false
                    },
                    {
                      name:`**ملحوظة :**`,value:`**\`\`\`في حالة وضع ايدي سيرفر خطأ يرجى الاتصال بالدعم الفني قبل مرور 15 دقيقة , في حالة مرور الوقت سيجب عليك دفع تكلفة 50 الف كريدت لنقل السيرفر\`\`\`**`,inline:false
                    }
                )
                await invoices.set(`${invoice}_${interaction.guild.id}` , 
                {
                    type:`اشتراك بوت ميكر التيميت لمدة شهر`,
                    token:Bot_token,
                    prefix:Bot_prefix,
                    userid:`${interaction.user.id}`,
                    guildid:`${interaction.guild.id}`,
                    serverid:`${Server_id}`,
                    price:price1
                })
                const newbalance = parseInt(userbalance) - parseInt(price1)
await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newbalance)
               await interaction.user.send({embeds:[doneembeduser] , components:[row]})
                let doneembedprove = new EmbedBuilder()
                .setColor(`Gold`)
                .setDescription(`**تم شراء \`اشتراك بوت ميكر التيميت لمدة شهر\` بواسطة : ${interaction.user}**`)
                .setTimestamp()
                let logroom =  setting.get(`log_room_${interaction.guild.id}`)
                let theroom = interaction.guild.channels.cache.find(ch => ch.id == logroom)
               await theroom.send({embeds:[doneembedprove]})
                await interaction.editReply({content:`**تم الاشتراك لسيرفرك بنجاح وتم خصم \`${price1}\` من رصيدك**` , components:[row]})
                const obj = {token:Bot_token,owner:interaction.user.id,guildid:Server_id,prefix:Bot_prefix,timeleft:2629744}
                await makers.push(obj)
                makers = makers
                await tier3subscriptions.set('tier3_subs' , makers)
                let usersub = usersdata.get(`sub_${interaction.user.id}`)
                if(!usersub) {
                  await usersdata.set(`sub_${interaction.user.id}` , true)
                }
                })
                client3.commandaliases = new Collection()
    const rest = new REST({ version: '10' }).setToken(Bot_token);
    module.exports = client3;
    client3.on("ready" , async() => {
      const guild = client3.guilds.cache.first();
      setInterval(async() => {
          const subs2 = tier3subscriptions.get(`tier3_subs`);
          const sub = subs2.find(su => su.guildid == guild.id)
          if(!sub) return;
          const theTimeleft = sub.timeleft;
          if(theTimeleft == 0) {
              await client3.users.fetch(owner);
              const theowner = client3.users.cache.find(us => us.id == owner);
              const endEmbed = new EmbedBuilder()
              .setTitle(`**انتهى اشتراك بوت الميكر الخاص بك**`)
              .setDescription(`**انتهى اشتراك بوت الميكر التيميت الخاص بك يمكنك اعادة الشراء مجددا دون فقد اي من البيانات**`)
              .setTimestamp()
              await theowner.send({embeds:[embed]})
              await client3.destroy();
          }
      }, 1000);
      try {
          await rest.put(
              Routes.applicationCommands(client3.user.id),
              { body: ultimateSlashCommands },
          );
      } catch (error) {
          console.error(error);
      }
  })
  client3.ultimateSlashCommands = new Collection()
const ultimateSlashCommands = [];
const ascii = require('ascii-table');
const { setMaxListeners } = require("events");
const table = new ascii('Owner Commands').setJustify();
try {

const commandsDir = path.join(__dirname, '../../ultimateBots/commands'); // Resolve the directory path
console.log(commandsDir)
if (!fs.existsSync(commandsDir)) {
throw new Error(`'../../ultimateBots/commands/' directory does not exist.`);
}
const folders = fs.readdirSync(commandsDir);

for (let folder of folders.filter(folder => !folder.includes('.'))) {
const folderPath = path.join(commandsDir, folder);
const files = fs.readdirSync(folderPath);

for (let file of files.filter(f => f.endsWith('.js'))) {
let command = require(path.join(folderPath, file));

if (command) {
ultimateSlashCommands.push(command.data.toJSON());
client3.ultimateSlashCommands.set(command.data.name, command);
if (command.data.name) {
table.addRow(`/${command.data.name}`, '🟢 Working');
} else {
table.addRow(`/${command.data.name}`, '🔴 Not Working');
}
}
}
}
} catch (err) {
console.error("An error occurred:", err);
}

try {
const eventsDir = path.join(__dirname, '../../ultimateBots/events'); // Resolve the directory path

if (!fs.existsSync(eventsDir)) {
throw new Error(`'../../ultimateBots//' directory does not exist.`);
}

const folders = fs.readdirSync(eventsDir);

for (let folder of folders.filter(folder => !folder.includes('.'))) {
const folderPath = path.join(eventsDir, folder);
const files = fs.readdirSync(folderPath);

for (let file of files.filter(f => f.endsWith('.js'))) {
const event = require(path.join(folderPath, file));
if (event.once) {
client3.once(event.name, (...args) => event.execute(...args));
} else {
client3.on(event.name, (...args) => event.execute(...args));
}
}
}
} catch (err) {
console.error("An error occurred:", err);
}

try {
const buttonsDir = path.join(__dirname, '../../buttons'); // Resolve the directory path

if (!fs.existsSync(buttonsDir)) {
throw new Error(`'../../buttons/' directory does not exist.`);
}

const folders = fs.readdirSync(buttonsDir);

for (let folder of folders.filter(folder => !folder.includes('.'))) {
const folderPath = path.join(buttonsDir, folder);
const files = fs.readdirSync(folderPath);

for (let file of files.filter(f => f.endsWith('.js'))) {
const event = require(path.join(folderPath, file));
if (event.once) {
client3.once(event.name, (...args) => event.execute(...args));
} else {
client3.on(event.name, (...args) => event.execute(...args));
}
}
}
} catch (err) {
console.error("An error occurred:", err);
}

client3.on('ready' , async() => {
  const guild = client3.guilds.cache.first()
try {
let guilds = client3.guilds.cache.forEach(async(guild) => {
let subscriptions3 = tier3subscriptions.get(`tier3_subs`)
if(!subscriptions3) {
await tier3subscriptions.set(`tier3_subs` , [])
}
let filtered = subscriptions3.find(a => a.guildid == guild.id)
if(!filtered) {
if(guild.id == guild.id) return;
await guild.leave();
}
})
} catch (error) {
return
}

})
client3.on("messageCreate" , async(message) => {
if(message.content == `<@${client3.user.id}>`) {
if(message.author.bot) return;
return message.reply({content:`**Hello In <@${client3.user.id}> , Im Using / Commands**`})
}
})

client3.on("guildCreate" , async(guild) => {
let subscriptions3 = tier3subscriptions.get(`tier3_subs`)
let filtered = subscriptions3.find(a => a.guildid == guild.id)
if(!filtered) {
if(guild.id == guildid) return;
await guild.leave();
}
})
//-
client3.on("messageCreate" , async(message) => {
const transfer_room = setting.get(`transfer_room_${message.guild.id}`)
const probot = setting.get(`probot_${message.guild.id}`)
if(!probot && !transfer_room) return;
if(message.author.id == probot) return;
if(message.channel.id != transfer_room) return;
if(message.author.id == client3.user.id) return;
setTimeout(() => {
try {
message.delete().catch(async() => {return;})
} catch (error) {
return
}
}, 15000);
})

client3.on('messageCreate' , async(message) => {
const transfer_room = setting.get(`transfer_room_${message.guild.id}`)
const probot = setting.get(`probot_${message.guild.id}`)
if(!probot && !transfer_room) return;
if(message.channel.id == transfer_room) {
if(message.author.id == client3.user.id) return;
if(message.author.id == probot) {
if(message.content.includes("has transferred")) {
  message.channel.send({files:[
    {
      name:`line.png`,attachment:`https://cdn.discordapp.com/attachments/1139539597886488646/1143552263944671252/LINE.jpg`
    }
  ]})
}
else{
  setTimeout(() => {
    try {
      message.delete().catch(async() => {return;})
    } catch (error) {
      return
    }
  }, 15000);
}
}
}
})
                await client3.login(Bot_token)
            }catch(err){
              console.error(err)
                return interaction.editReply({content:`**فشل التحقق**`})
            }
        }
    }
  }
}