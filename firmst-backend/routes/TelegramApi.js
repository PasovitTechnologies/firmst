const axios = require('axios');

class TelegramApi {
  constructor() {
    this.botToken = '7781469818:AAG3uBsnVeHCuP6yQrH4s60CbUuDHVP61c8';
    this.chat_id = null;
    this.text = null;
  }

  async sendMessage() {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    try {
      const response = await axios.post(url, {
        chat_id: this.chat_id,
        text: this.text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message to Telegram:', error.message);
      if (error.response) {
        console.error('Telegram API response:', error.response.data);
      } else {
        console.error('No response received from Telegram API.');
      }
      throw error;
    }
  }
}

module.exports = { TelegramApi };
