import { getSavedJobs } from "@/apis/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

function SavedJob() {
  const {
    fn: fnGetSavedJobs,
    loading: loadingGetSavedJobs,
    data,
  } = useFetch(getSavedJobs);

  console.log(data);

  const { isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) fnGetSavedJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingGetSavedJobs) {
    return <BarLoader />;
  }
  return (
    <div>
      <h2 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h2>

      {loadingGetSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.length ? (
            data.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job.job}
                  savedInit={true}
                  onJobAction={fnGetSavedJobs}
                />
              );
            })
          ) : (
            <div>No Jobs Found 🥲</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SavedJob;
