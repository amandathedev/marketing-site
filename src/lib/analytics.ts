const API_URL = import.meta.env.VITE_API_URL ?? '';

export function track(name: string, properties: Record<string, unknown> = {}): void {
  if (!API_URL) return;
  fetch(`${API_URL}/api/v1/analytics/marketing_events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, properties }),
  }).catch(() => {});
}
