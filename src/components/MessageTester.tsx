import { FormEvent, useMemo, useState } from "react";

const FALLBACK_TELEGRAM_BOT_TOKEN = "8301432354:AAEjrwvJ7HRq2fTZPWyVUQaWgJm0llq8Ulk";

interface TelegramUpdate {
  message?: { chat?: { id?: number } };
  channel_post?: { chat?: { id?: number } };
}

const MessageTester = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const botToken = useMemo(
    () =>
      (import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined)?.trim() ||
      FALLBACK_TELEGRAM_BOT_TOKEN,
    [],
  );

  const configuredChatId = useMemo(
    () => (import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined)?.trim() || "",
    [],
  );

  const resolveChatId = async () => {
    if (configuredChatId) return configuredChatId;

    const updatesResponse = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    if (!updatesResponse.ok) return "";

    const updatesBody = (await updatesResponse.json()) as { result?: TelegramUpdate[] };
    const updates = updatesBody.result || [];
    const latest = updates[updates.length - 1];

    const chatId = latest?.message?.chat?.id || latest?.channel_post?.chat?.id;
    return chatId ? String(chatId) : "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setStatus("Type your name first.");
      setSent(false);
      return;
    }

    if (!trimmedMessage) {
      setStatus("Write your message first.");
      setSent(false);
      return;
    }

    try {
      setSending(true);
      setSent(false);
      setStatus("Sending...");

      const chatId = await resolveChatId();
      if (!chatId) {
        setStatus("Message send system not working: open Telegram and send your bot any message first.");
        return;
      }

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `💌 Surprise Message Hub\n\nFrom: ${trimmedName}\nMessage: ${trimmedMessage}`,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || "Failed to send Telegram message.");
      }

      setMessage("");
      setSent(true);
      setStatus("Message sent ✅");
    } catch {
      setSent(false);
      setStatus("Message send system not working. Please check bot setup.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border-t border-border/70 bg-card p-4 pt-3">
      <p className="text-sm font-medium text-foreground">Write your message</p>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-base outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Type your name"
      />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="min-h-16 w-full rounded-xl border border-input bg-background px-3 py-2 text-base outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        disabled={sending}
        className={`w-full rounded-xl px-3 py-2 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-70 ${
          sent ? "bg-green-600 text-white" : "bg-primary text-primary-foreground"
        }`}
      >
        {sending ? "Sending..." : sent ? "Message sent ✅" : "Send message"}
      </button>
      {status && <p className="text-xs text-muted-foreground">{status}</p>}
    </form>
  );
};

export default MessageTester;
