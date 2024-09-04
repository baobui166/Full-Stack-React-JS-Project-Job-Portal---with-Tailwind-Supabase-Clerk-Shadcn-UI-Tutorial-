import { getJobs } from "@/apis/apiJobs";
import JobCard from "@/components/JobCard";
import usefetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

function JobListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: dataJobs,
    isLoading: loadingJobs,
  } = usefetch(getJobs, { location, searchQuery, company_id });

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <CircleLoader
          className="mt-4"
          width={"100%"}
          color="#36d7d7"
        ></CircleLoader>
      </div>
    );
  }

  console.log(dataJobs);
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* add filter here */}

      {loadingJobs && (
        <div className="flex justify-center items-center w-full h-full">
          <CircleLoader
            className="mt-4"
            width={"100%"}
            color="#36d7d7"
          ></CircleLoader>
        </div>
      )}

      {loadingJobs === false ||
        (loadingJobs === undefined && (
          <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataJobs?.length ? (
              dataJobs.map((job) => <JobCard key={job.id} job={job}></JobCard>)
            ) : (
              <div>No Jobs Found🥲</div>
            )}
          </div>
        ))}
    </div>
  );
}

export default JobListing;
