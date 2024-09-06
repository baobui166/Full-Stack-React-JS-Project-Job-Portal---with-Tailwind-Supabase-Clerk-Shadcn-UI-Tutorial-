import { getSingleJob, updateHiringStatus } from "@/apis/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJob from "@/components/ui/ApplyJob";
import ApplicationCard from "@/components/ApplicationCard";

function JobPage() {
  const { user, isLoaded } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch(getSingleJob, { job_id: id });

  const { fn: fnUpdateJob, loading: loadingUpdateJob } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnUpdateJob(isOpen).then(() => fnJob());
  };

  console.log(job);

  useEffect(() => {
    if (isLoaded) fnJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (loadingJob)
    return <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />;
  return (
    <div className="flex flex-col gap-8 my-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase />
          {job?.application?.length} Applications
        </div>
        <div className="flex items-center gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}{" "}
        </div>
      </div>
      {/* hiring status */}
      {loadingUpdateJob && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={(value) => handleStatusChange(value)}>
          <SelectTrigger
            className={`w-full text-white ${
              job?.isOpen ? "bg-green-950" : "bg-red-950"
            }`}
          >
            <SelectValue
              className="text-white"
              placeholder={"Hiring Status" + (job?.isOpen ? "Open" : "Closed")}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />
      {/* render application */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJob
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.recruiter_id === user.id)}
        />
      )}
      {job?.applications?.length > 0 && job?.recruiter_id === user.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
          {job?.applications?.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobPage;
