require('dotenv').config();
const axios = require('axios');

module.exports = async (interaction) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/customsearch/v1',
      {
        params: {
          q: interaction.options._hoistedOptions[0].value,
          key: process.env.GOOGLE_API,
          cx: process.env.GOOGLE_CX,
        },
      },
    );
    return Promise.resolve(response);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
