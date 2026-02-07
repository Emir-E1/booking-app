import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jvlgaybrrcihnjiuijhs.supabase.co";
const supabaseKey = "sb_publishable_2Jd7_8-Os8w-ibZOdbz6Zw_1AANbrka";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
