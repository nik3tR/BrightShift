import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => supabase.auth.signInWithOAuth({ provider: "google" });
  const signOut = async () => supabase.auth.signOut();

  return { session, signInWithGoogle, signOut };
}
