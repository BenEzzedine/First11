const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, MessageComponentCollector, ButtonStyle } = require("discord.js");
const { Database } = require("st.db");

const usersdata = new Database(`/database/usersdata/usersdata`)
const { owner } = require('../../config.json');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('give-coins')
        .setDescription('اعطاء شخص عملات')
        .addUserOption(Option => Option
            .setName(`user`)
            .setDescription(`The person to whom you want to give credit`)
            .setRequired(true))
        .addIntegerOption(Option => Option
            .setName(`quantity`)
            .setDescription(`amount`)
            .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false })
        let user = interaction.options.getUser(`user`)
        let quantity = interaction.options.getInteger(`quantity`)
        let userbalance = usersdata.get(`balance_${user.id}_${interaction.guild.id}`);
        if(!userbalance) {
           await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , quantity)
        } else {
            let newuserbalance = parseInt(userbalance) + parseInt(quantity)
            await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , newuserbalance)
        }
        userbalance = usersdata.get(`balance_${user.id}_${interaction.guild.id}`)
        let balanceembed = new EmbedBuilder()
            .setDescription(`**done give ${user} Balance successfully\n His current balance is: \`${userbalance}\`**`)
      
            .setColor(`Gold`)
            .setTimestamp()
        if (interaction.user.id !== owner) {
            return interaction.editReply({ content: `You cannot use this command!` })
        }
        return interaction.editReply({ embeds: [balanceembed] })
    }
}
