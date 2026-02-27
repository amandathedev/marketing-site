import { useState, useCallback, useEffect, useRef } from 'react';
import { track } from '../../lib/analytics';
import { sendChatMessage, submitLead } from '../../lib/marketingChat';
import type { ChatMessage, ChatState, UiHints } from '../../lib/marketingChat';
import { ChatLauncher } from './ChatLauncher';
import { ChatPanel } from './ChatPanel';

const SESSION_KEY = 'ctlx_chat_session';
const OPENING_MESSAGE = "Hi. I can help you figure out if Cattlytx is a fit for your operation. Are you running a feedlot?";

const OPENING_CHIPS = ["Yes, large operation (20k+ head)", "Yes, smaller operation", "Not an operator"];

function getOrCreateSession(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<ChatState>({});
  const [uiHints, setUiHints] = useState<UiHints>({
    show_suggestion_chips: true,
    chips: OPENING_CHIPS,
    show_demo_cta: false,
  });
  const [loading, setLoading] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const sessionId = useRef(getOrCreateSession());
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasOpenedOnce = useRef(false);

  // Nudge: show after 25s, or on 50% scroll
  useEffect(() => {
    nudgeTimer.current = setTimeout(() => {
      if (!open) setNudgeVisible(true);
    }, 25000);

    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.5 && !open) setNudgeVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setNudgeVisible(false);
    if (nudgeTimer.current) clearTimeout(nudgeTimer.current);

    if (!hasOpenedOnce.current) {
      hasOpenedOnce.current = true;
      track('opened_chat', {});
      // Inject the opening assistant message on first open
      setMessages([{ role: 'assistant', content: OPENING_MESSAGE }]);
    }
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    track('sent_message', { session_id: sessionId.current });

    try {
      const history = messages.slice(-10); // last 10 turns sent to API
      const response = await sendChatMessage({
        session_id: sessionId.current,
        message: trimmed,
        history,
        state,
      });

      const assistantMsg: ChatMessage = { role: 'assistant', content: response.reply };
      setMessages((prev) => [...prev, assistantMsg]);

      // Merge state updates
      if (response.state_updates && Object.keys(response.state_updates).length > 0) {
        setState((prev) => {
          const next = { ...prev, ...response.state_updates };
          // Merge pain_points (append, dedup)
          if (response.state_updates.pain_points?.length) {
            const existing = prev.pain_points ?? [];
            const incoming = response.state_updates.pain_points;
            next.pain_points = [...new Set([...existing, ...incoming])].slice(0, 3);
          }
          return next;
        });
      }

      setUiHints(response.ui_hints);

      // Analytics
      if (response.ui_hints.show_demo_cta) {
        track('demo_offered', { session_id: sessionId.current });
      }

      // Auto-submit lead when bot confirms capture
      if (
        response.ui_hints.lead_captured &&
        !leadSubmitted &&
        (response.state_updates.lead_email || state.lead_email)
      ) {
        const mergedState = { ...state, ...response.state_updates };
        const fullTranscript = [...messages, userMsg, assistantMsg];
        await submitLead({
          session_id: sessionId.current,
          name: mergedState.lead_name ?? '',
          email: mergedState.lead_email ?? '',
          phone: mergedState.lead_phone ?? undefined,
          captured_state: mergedState,
          transcript: fullTranscript,
        });
        setLeadSubmitted(true);
        track('lead_submitted', { session_id: sessionId.current });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting. Please try again or email us at contact@cattlytx.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, state, leadSubmitted]);

  const handleChipClick = useCallback((chip: string) => {
    track('chips_clicked', { chip, session_id: sessionId.current });
    handleSend(chip);
  }, [handleSend]);

  const handleDemoClick = useCallback(() => {
    track('demo_clicked', { session_id: sessionId.current });
    handleSend("I'd like to connect with Andrew.");
  }, [handleSend]);

  return (
    <>
      <ChatLauncher
        open={open}
        nudgeVisible={nudgeVisible && !open}
        onOpen={handleOpen}
        onClose={handleClose}
      />
      {open && (
        <ChatPanel
          messages={messages}
          loading={loading}
          uiHints={uiHints}
          onSend={handleSend}
          onClose={handleClose}
          onChipClick={handleChipClick}
          onDemoClick={handleDemoClick}
        />
      )}
    </>
  );
}
