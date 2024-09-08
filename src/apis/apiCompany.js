import supabaseClient, { supabaseUrl } from "@/utils/supabase";

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

export async function addCompany(token, _, dataCompany) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${dataCompany.name}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, dataCompany.logo);

  if (storageError) throw new Error("Error Adding Company");

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  const { data, error: addCompanyError } = await supabase
    .from("companies")
    .insert([{ name: dataCompany.name, logo_url }])
    .select();

  if (addCompanyError) {
    console.error("Have a error adding company: ", addCompanyError);
    return null;
  }

  return data;
}
