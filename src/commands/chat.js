const { EmbedBuilder } = require('discord.js');

module.exports = (interaction, response) => {
  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Ask ChatGPT')
    .setAuthor({
      name: interaction.user.username,
      iconURL: `${interaction.user.displayAvatarURL(interaction.user.avatar)}`,
      url: `${interaction.user.displayAvatarURL(interaction.user.avatar)}`,
    })
    .setDescription(
      `You asked ChatGPT '${interaction.options._hoistedOptions[0].value}'`,
    )
    .setThumbnail(
      `${interaction.user.displayAvatarURL(interaction.user.avatar)}`,
    )
    .addFields({
      name: 'Returned value',
      value: response,
    })
    .setImage('https://i.imgur.com/8jiswkw.png')
    .setTimestamp()
    .setFooter({
      text: 'Service provided by mokno',
      iconURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png',
    });
};
