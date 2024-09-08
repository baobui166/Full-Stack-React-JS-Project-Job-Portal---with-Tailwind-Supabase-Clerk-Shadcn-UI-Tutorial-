import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

function MyJobs() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#35d7b7" className="mt-2" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-center text-5xl sm:text-7xl pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My application"
          : "My Jobs"}
      </h1>

      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplication />
      ) : (
        <CreatedJob />
      )}
    </div>
  );
}

export default MyJobs;
