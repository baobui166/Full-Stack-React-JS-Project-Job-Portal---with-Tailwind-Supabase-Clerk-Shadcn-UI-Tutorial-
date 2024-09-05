import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./button";
import { Input } from "./input";

function ApplyJob({ user, job, applied = false, fetchJob }) {
  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disable={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please fill the form below.</DrawerDescription>
        </DrawerHeader>
        <form className="flex flex-col gap-4 p-4 pb-0">
          <Input
            type="number"
            placeholder="Enter the years experience"
            className="flex-1"
          />
          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1"
          />

          <RadioGroup defaultValue="intermediate">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Graduate" id="garduate" />
              <Label htmlFor="garduate">Graduate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Post Graduate" id="post-graduate" />
              <Label htmlFor="post-graduate">Post Graduate</Label>
            </div>
          </RadioGroup>
        </form>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ApplyJob;
