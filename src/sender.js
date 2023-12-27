import TelegramBot from "node-telegram-bot-api";

const BOT_API_KEY = "6638737360:AAFInIZ8DKsRo9gGfMU2NvukqwsiyPa9NqY";
const CHAT_ID = "1029133535";

const bot = new TelegramBot(BOT_API_KEY, { polling: true });

export const sendFlatUpdate = async (flats) => {
  for (const element of flats) {
    await bot.sendMessage(
      CHAT_ID,
      `${element.title}\n${element.price}€\n${element.link}`
    );
  }
};
