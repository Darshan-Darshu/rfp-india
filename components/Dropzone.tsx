"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import DropzoneComponent from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { uploadFileToDB } from "@/actions/upload";

function Dropzone() {
  const { isLoaded, isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const { toast } = useToast();
  const maxSize = 20971520;
  const onDrop = (acceptedFiles: File[]) => {
    if (!userEmail) return;
    if (!acceptedFiles.length) {
      toast({
        variant: "destructive",
        title: "Uh oh! please select the file",
        description:
          "There was a problem with your request.",
      });
      return;
    }
    if (acceptedFiles.length > 1) {
      toast({
        variant: "destructive",
        title: "Uh oh! No more than one file allowed",
        description:
          "There was a problem with your request.",
      });
      return;
    }
    toast({
      description: "csv is uploading",
    });
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    uploadFileToDB(formData, userEmail)
      .then((res: any) => {
        if (res.err) {
          toast({
            variant: "destructive",

            description: res.err,
          });
        } else {
          toast({
            description: "csv is uploaded",
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "something went wrong",
        });
      });
  };

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 &&
          fileRejections[0].file.size > maxSize;

        return (
          <section className='m-4'>
            <div
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400",
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive &&
                "Click here or drop a file to upload"}
              {isDragActive &&
                !isDragReject &&
                "Drop to upload this file!"}
              {isDragReject &&
                "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className='text-danger mt-2'>
                  File is too large
                </div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
