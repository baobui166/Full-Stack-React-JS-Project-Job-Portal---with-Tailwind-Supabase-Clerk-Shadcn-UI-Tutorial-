import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getApplications(token, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-$${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .update(fileName, jobData.resume);

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error: getApplicationsError } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select();

  if (getApplicationsError) {
    console.error("Error submitting applications: ", getApplicationsError);
    return null;
  }

  if (storageError) {
    console.error("Error Uploading reume: ", storageError);
    return null;
  }

  return data;
}
