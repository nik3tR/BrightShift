import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing VITE_SUPABASE_URL environment variable. " +
    "Make sure to set it in your .env.local file for development, " +
    "or pass it as a build arg when building the Docker image."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_ANON_KEY environment variable. " +
    "Make sure to set it in your .env.local file for development, " +
    "or pass it as a build arg when building the Docker image."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
