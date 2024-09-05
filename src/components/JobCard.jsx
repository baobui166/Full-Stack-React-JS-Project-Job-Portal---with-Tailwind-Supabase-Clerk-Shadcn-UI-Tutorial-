import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { saveJob } from "@/apis/apiJobs";
import { useEffect, useState } from "react";

function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSave = () => {},
}) {
  const [saved, setSaved] = useState(savedInit);

  const {
    fn: fnSaveJobs,
    data: saveJobs,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, { alreadySaved: saved });

  const { user } = useUser();

  const handleSaveJob = async () => {
    await fnSaveJobs({ user_id: user.id, job_id: job.id });
    onJobSave();
  };

  useEffect(() => {
    if (saveJobs !== undefined) setSaved(saveJob.length > 0);
  }, [saveJobs]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-800 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15}></MapPinIcon>
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            {" "}
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disable={loadingSavedJobs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;
