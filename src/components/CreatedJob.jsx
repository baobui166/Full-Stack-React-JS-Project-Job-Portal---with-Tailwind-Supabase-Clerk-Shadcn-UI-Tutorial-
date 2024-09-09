import { getMyJobs } from "@/apis/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";

function CreatedJob() {
  const { user } = useUser();

  const { loading, data, fn, error } = useFetch(getMyJobs, {
    recuiter_id: user.id,
  });

  useEffect(() => {
    fn();
  }, []);

  if (loading) {
    return <BarLoader width={"100%"} color="#35d7b7" className="mb-4" />;
  }
  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.length ? (
        data.map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              savedInit={job?.saved?.length > 0}
              isMyJob
            />
          );
        })
      ) : (
        <div>No Jobs Found 😢</div>
      )}
    </div>
  );
}

export default CreatedJob;
