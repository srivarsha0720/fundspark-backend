import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // load env

// create supabase client using service role
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default supabase;