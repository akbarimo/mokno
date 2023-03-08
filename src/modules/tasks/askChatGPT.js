require('dotenv').config();
const axios = require('axios');

module.exports = async (interaction) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: interaction.options._hoistedOptions[0].value,
          },
        ],
        temperature: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_TOKEN}`,
        },
      },
    );
    return response.data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return err;
  }
};
