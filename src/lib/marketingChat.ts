const API_URL = import.meta.env.VITE_API_URL ?? '';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatState {
  visitor_type?: string | null;
  operation_type?: string | null;
  headcount_range?: string | null;
  pain_points?: string[];
  current_tools?: string | null;
  buyer_type?: string | null;
  interest_level?: string | null;
  demo_offered?: boolean;
  lead_name?: string | null;
  lead_email?: string | null;
  lead_phone?: string | null;
}

export interface UiHints {
  show_suggestion_chips: boolean;
  chips: string[];
  show_demo_cta: boolean;
  lead_captured?: boolean;
}

export interface ChatResponse {
  reply: string;
  state_updates: Partial<ChatState>;
  ui_hints: UiHints;
}

export interface LeadPayload {
  session_id: string;
  name: string;
  email: string;
  phone?: string;
  captured_state: ChatState;
  transcript: ChatMessage[];
}

export async function sendChatMessage(params: {
  session_id: string;
  message: string;
  history: ChatMessage[];
  state: ChatState;
}): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/marketing/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  return res.json();
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${API_URL}/api/marketing/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed: ${res.status}`);
  }
}
