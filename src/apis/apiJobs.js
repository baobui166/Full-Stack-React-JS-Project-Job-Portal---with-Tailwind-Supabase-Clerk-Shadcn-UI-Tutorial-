import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

  const { data, error } = await query;

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("searchQuery", `%${searchQuery}%`);
  }
  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error Deleting Saved Jobs:", deleteError);
      return null;
    }

    return data;
  } else {
    const { data, error: inserError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (inserError) {
      console.error("Error Inserting Saved Jobs:", inserError);
      return null;
    }

    return data;
  }

  // const { data, error } = await supabase
  //   .from("jobs")
  //   .select("*, company: companies(name, logo_url), saved:saved_jobs(id)");

  // if (error) {
  //   console.error("Error fetching jobs:", error);
  //   return null;
  // }

  // return data;
}

export async function getSigleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error: getJobError } = await supabase
    .from("jobs")
    .select(
      "*, company:companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (getJobError) {
    console.error("Error getting job: ", getJobError);
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  const { data, error: updateJobError } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (updateJobError) {
    console.error("Error updating Job: ", updateJobError);
  }

  return data;
}
