const axios = require('axios');

module.exports = patchQueries = (interaction) => {
  axios({
    url: 'http://localhost:8080/bot/info/queries',
    method: 'PATCH',
    data: {
      guildId: interaction.guildId,
      query: {
        user: interaction.user.username,
        string: interaction.options._hoistedOptions[0].value,
      },
    },
  }).catch((err) => console.error('Could not patch queries', err));
};
