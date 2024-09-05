import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data, error: getCompanyError } = await supabase
    .from("companies")
    .select("*");

  if (getCompanyError) {
    console.error("Have a error fetching company: ", getCompanyError);
    return null;
  }

  return data;
}
