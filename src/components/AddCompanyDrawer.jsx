import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetch from "@/hooks/use-fetch";
import { addCompany } from "@/apis/apiCompany";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

function AddCompanyDrawer({ fetchCompanies }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    fn: addNewCompany,
    loading: loaddingAddCompany,
    data: dataCompany,
    error: errorAddCompany,
  } = useFetch(addCompany);

  const onSubmit = (data) => {
    addNewCompany({ ...data, logo: data.logo[0] });
  };
  useEffect(() => {
    if (dataCompany?.length > 0) fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaddingAddCompany]);

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Button type="button" size="sm" variant="secondary">
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a new company</DrawerTitle>
          </DrawerHeader>
          <form className="flex gap-2 p-4 pb-0">
            <Input placeholder="Company Name..." {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <Input
              type="file"
              accept="image/*"
              className="file:text-gray-500"
              {...register("logo")}
            />
            {errors.logo && (
              <p className="text-red-500">{errors.logo.message}</p>
            )}
            {errorAddCompany?.message && (
              <p className="text-red-500">{errorAddCompany?.message}</p>
            )}

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="destructive"
              className="w-40"
            >
              Add
            </Button>
          </form>
          {loaddingAddCompany && <BarLoader width={"100%"} color="#35d7b7" />}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default AddCompanyDrawer;
