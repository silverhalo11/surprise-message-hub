# Surprise Message Hub

This project includes a **"Write your message tester"** panel directly under the video player. The tester forwards messages to a Telegram bot.

## Telegram setup

- The app is wired with the provided Telegram bot token.
- Optional: set `VITE_TELEGRAM_CHAT_ID` in `.env` for a fixed destination chat.
- If `VITE_TELEGRAM_CHAT_ID` is not set, the app will try to detect the latest chat id from `getUpdates`.
- The tester requires a **name** and a **message** before sending.
- On successful send, the button turns green and shows **Message sent ✅**.

```bash
VITE_TELEGRAM_CHAT_ID=your_chat_id
