import { createClient } from "@supabase/supabase-js/dist/module";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_PRIVATE_KEY as string
);
