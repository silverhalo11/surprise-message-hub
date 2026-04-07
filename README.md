# Surprise Message Hub

This project includes a **"Write your message tester"** panel directly under the video player. The tester forwards messages to a Telegram bot.

## Telegram setup

- The app is already wired with the provided Telegram bot token.
- You can send messages by entering a Telegram **chat id** in the tester input.
- Optionally, create a `.env` file to override defaults:

```bash
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
```

> Tip: Start a conversation with your bot first, then use your numeric user/group chat id.

## Run locally

```bash
npm install
npm run dev
```
