import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ytthuqlakahwryrnblmi.supabase.co"
const supabaseKey = "sb_publishable_h9Y2n8ZYxxQXV7shtEOTGg_Ip2CsHin";

export const supabase = createClient(supabaseUrl, supabaseKey);
