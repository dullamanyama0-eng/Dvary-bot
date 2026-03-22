import telebot
import os
from flask import Flask
from threading import Thread

# --- PASTE YOUR TELEGRAM TOKEN BELOW ---
API_TOKEN = '8665803785:AAEB0ZUnFH4AiWy...' 

bot = telebot.TeleBot(API_TOKEN)
app = Flask('')

@app.route('/')
def home():
    return "Bot is running online!"

def run():
    app.run(host='0.0.0.0', port=8080)

# The /start command in English
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Congratulations! Dvary-bot is now LIVE and working perfectly! 🚀")

# You can add more bot features here...

if __name__ == "__main__":
    # This starts the Web Server to keep Render from sleeping
    t = Thread(target=run)
    t.start()
    
    # This starts the Bot itself
    print("Bot is starting...")
    bot.polling(none_stop=True)

