"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TextField, Button, Callout } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const [description, setDescription] = useState("");
  const [serverErrors, setServerErrors] = useState<{
    title?: string[];
    description?: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  // Register 'description' manually
  useEffect(() => {
    register("description", { required: true });
  }, [register]);

  // Keep RHF in sync with SimpleMDE state
  useEffect(() => {
    setValue("description", description);
  }, [description, setValue]);

  const onSubmit = async (data: IssueForm) => {
    console.log("Form submitted:", data);

    try {
       await axios.post("/api/issues", data);

      // Clear the form after successful submission
      setDescription("");
      setServerErrors(null);
      setError("");

      // Redirect
      router.push("/issues");
    } 
    catch (err) {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 400 && err.response.data?.errors) {
      setServerErrors(err.response.data.errors);
    } else {
      setError("An unexpected error occurred.");
    }
  } else {
    setError("An unexpected error occurred.");
  }
}
  };

  return (
    <div className="bg-[#000319] w-full h-full p-10 flex justify-center items-center border rounded-2xl">
    <div className="max-w-2xl w-full h-full space-y-3 bg-white p-5 flex justify-center items-center border rounded-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Title input */}
        <div>
          <TextField.Root
            placeholder="Issue title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
          {serverErrors?.title && (
            <p className="text-red-500 text-sm mt-1">
              {serverErrors.title[0]}
            </p>
          )}
        </div>

        {/* Description input */}
        <div>
          <SimpleMDE
            value={description}
            onChange={setDescription}
            placeholder="Write your issue..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
          {serverErrors?.description && (
            <p className="text-red-500 text-sm mt-1">
              {serverErrors.description[0]}
            </p>
          )}
        </div>

        <Button className="" type="submit">Submit Issue</Button>
      </form>
    </div>
    </div>
  );
};

export default NewIssuePage;
