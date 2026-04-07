# Surprise Message Hub

This project includes a **"Write your message tester"** panel directly under the video player. The tester forwards messages to a Telegram bot.

## Telegram setup

- The app is already wired with the provided Telegram bot token.
- Add your Telegram chat id in `.env`:

```bash
VITE_TELEGRAM_CHAT_ID=your_chat_id
```

- The tester now requires a **name** and a **message** before sending.
- The chat id is intentionally hidden from the UI.

> Tip: Start a conversation with your bot first, then use your numeric user/group chat id.

## Run locally

```bash
npm install
npm run dev
```
