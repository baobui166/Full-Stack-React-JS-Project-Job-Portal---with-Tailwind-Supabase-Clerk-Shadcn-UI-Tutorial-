import { fetchApplications } from "@/apis/apiApplicartions";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";

function CreatedApplication() {
  const { user, isLoaded } = useUser();

  const {
    loadding: loadingGetApp,
    data,
    fn: fnGetApp,
  } = useFetch(fetchApplications, { user_id: user.id });

  useEffect(() => {
    if (isLoaded) fnGetApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingGetApp) {
    return <BarLoader width={"100%"} color="#35b7d7" />;
  }
  return (
    <div className="flex flex-col gap-3">
      {data?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        );
      })}
    </div>
  );
}

export default CreatedApplication;
