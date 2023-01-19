const { EmbedBuilder } = require('discord.js');

module.exports = (interaction, response) => {
  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Ask Google')
    .setAuthor({
      name: interaction.user.username,
      iconURL: `${interaction.user.displayAvatarURL(interaction.user.avatar)}`,
      url: `${interaction.user.displayAvatarURL(interaction.user.avatar)}`,
    })
    .setDescription(
      `You searched '${interaction.options._hoistedOptions[0].value}'`,
    )
    .setThumbnail(
      `${interaction.user.displayAvatarURL(interaction.user.avatar)}`,
    )
    .addFields(
      {
        name: response.data.items[0].title,
        value: response.data.items[0].link,
      },
      {
        name: response.data.items[1].title,
        value: response.data.items[1].link,
      },
      {
        name: response.data.items[2].title,
        value: response.data.items[2].link,
      },
      {
        name: response.data.items[3].title,
        value: response.data.items[3].link,
      },
      {
        name: response.data.items[4].title,
        value: response.data.items[4].link,
      },
    )
    .setImage('https://i.imgur.com/8jiswkw.png')
    .setTimestamp()
    .setFooter({
      text: 'Service provided by mokno',
      iconURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU',
    });
};
