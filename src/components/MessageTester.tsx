import { FormEvent, useMemo, useState } from "react";

const FALLBACK_TELEGRAM_BOT_TOKEN = "8301432354:AAEjrwvJ7HRq2fTZPWyVUQaWgJm0llq8Ulk";

const MessageTester = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const botToken = useMemo(
    () =>
      (import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined)?.trim() ||
      FALLBACK_TELEGRAM_BOT_TOKEN,
    [],
  );

  const chatId = useMemo(
    () => (import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined)?.trim() || "",
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setStatus("Please type your name before sending.");
      return;
    }

    if (!trimmedMessage) {
      setStatus("Please write a message before sending.");
      return;
    }

    if (!chatId) {
      setStatus("Telegram chat is not configured yet. Set VITE_TELEGRAM_CHAT_ID.");
      return;
    }

    try {
      setSending(true);
      setStatus("Sending...");

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
      setStatus("Message sent to Telegram successfully.");
    } catch {
      setStatus("Could not send message. Please verify your Telegram bot setup.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border-t border-border/70 bg-card p-4">
      <p className="text-sm font-medium text-foreground">Write your message tester</p>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Type your name"
      />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="min-h-16 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? "Sending..." : "Send message"}
      </button>
      {status && <p className="text-xs text-muted-foreground">{status}</p>}
    </form>
  );
};

export default MessageTester;