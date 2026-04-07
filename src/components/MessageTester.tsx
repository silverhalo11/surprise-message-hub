import { FormEvent, useMemo, useState } from "react";

const FALLBACK_TELEGRAM_BOT_TOKEN = "8301432354:AAEjrwvJ7HRq2fTZPWyVUQaWgJm0llq8Ulk";

const MessageTester = () => {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

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

  const targetChatId = chatId.trim() || configuredChatId;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setStatus("Please write a message before sending.");
      return;
    }

    if (!targetChatId) {
      setStatus("Add a Telegram Chat ID in the field (or set VITE_TELEGRAM_CHAT_ID).");
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
          chat_id: targetChatId,
          text: `💌 Surprise Message Hub\n\n${trimmedMessage}`,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || "Failed to send Telegram message.");
      }

      setMessage("");
      setStatus("Message sent to Telegram successfully.");
    } catch {
      setStatus("Could not send message. Please verify your Telegram token and chat id.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border-t border-border/70 bg-card p-4">
      <p className="text-sm font-medium text-foreground">Write your message tester</p>
      <input
        value={chatId}
        onChange={(event) => setChatId(event.target.value)}
        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        placeholder={configuredChatId || "Telegram chat id (example: 123456789)"}
      />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="min-h-20 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Type a test message here..."
      />
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? "Sending..." : "Send to Telegram"}
      </button>
      {status && <p className="text-xs text-muted-foreground">{status}</p>}
    </form>
  );
};

export default MessageTester;
