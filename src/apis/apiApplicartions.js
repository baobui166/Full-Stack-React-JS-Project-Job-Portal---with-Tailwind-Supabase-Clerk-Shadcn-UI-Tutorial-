import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getApplications(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) throw new Error("Error uploading Resume");

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}

export async function updateApplication(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  const { data, error: updatingError } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select("*");

  if (updatingError || data.length === 0) {
    console.error("Have a error updating application: ", updatingError);
    return null;
  }

  return data;
}
