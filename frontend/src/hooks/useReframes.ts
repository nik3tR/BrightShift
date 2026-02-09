import { useState, useEffect } from "react";
import {api_url} from "../config.ts";

export function useReframes(session: any) {
  const [reframes, setReframes] = useState<{ id: string; original: string; reframe: string }[]>([]);

  const loadReframes = async () => {
    if (!session?.user) return;
    const res = await fetch(`${api_url}/history/${session.user.id}`);
    const data = await res.json();
    setReframes(data);
  };

  const saveReframe = async (original: string, reframe: string) => {
    if (!session?.user) return;
    await fetch(`${api_url}/save_reframe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: session.user.id,
        original,
        reframed: reframe,
      }),
    });
    loadReframes();
  };

  const deleteReframe = async (id: string) => {
    await fetch(`${api_url}/delete_reframe/${id}`, {
      method: "DELETE",
    });
    setReframes((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    if (session?.user) loadReframes();
  }, [session]);

  return { reframes, saveReframe, deleteReframe, loadReframes };
}