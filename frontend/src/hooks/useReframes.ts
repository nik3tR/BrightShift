import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useReframes(session: any) {
  const [reframes, setReframes] = useState<{ id: string; original: string; reframe: string }[]>([]);

  const loadReframes = async () => {
    if (!session?.user) return;
    const { data } = await supabase
      .from("reframes")
      .select("id, original, reframe")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });
    if (data) setReframes(data);
  };

  const saveReframe = async (original: string, reframe: string) => {
    if (!session?.user) return;
    await supabase.from("reframes").insert([{ user_id: session.user.id, original, reframe }]);
    loadReframes();
  };

  const deleteReframe = async (id: string) => {
    await supabase.from("reframes").delete().eq("id", id);
    setReframes((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    if (session?.user) loadReframes();
  }, [session]);

  return { reframes, saveReframe, deleteReframe, loadReframes };
}
