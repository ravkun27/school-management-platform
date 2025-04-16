import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import Input from "./ui/CustomInput";
import { FileText, Video, Upload } from "lucide-react";

interface UploadFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const UploadForm = ({ onSubmit, isLoading }: UploadFormProps) => {
  const { register, handleSubmit, watch } = useForm();
  const fileType = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Title" {...register("title", { required: true })} />

      <Input
        label="Description"
        {...register("description", { required: true })}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="video"
            value="video"
            {...register("type", { required: true })}
            className="text-primary"
          />
          <label htmlFor="video" className="flex items-center gap-1">
            <Video size={16} />
            Video
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="pdf"
            value="pdf"
            {...register("type", { required: true })}
            className="text-primary"
          />
          <label htmlFor="pdf" className="flex items-center gap-1">
            <FileText size={16} />
            PDF
          </label>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <label className="cursor-pointer">
          <Upload size={24} className="mx-auto mb-2 text-primary" />
          <span className="text-primary font-medium">Choose File</span>
          <input
            type="file"
            {...register("file", { required: true })}
            className="hidden"
            accept={fileType === "video" ? "video/*" : "application/pdf"}
          />
          <p className="text-sm text-gray-500 mt-1">
            {fileType === "video" ? "MP4, MOV, AVI" : "PDF files only"}
          </p>
        </label>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Upload Content
      </Button>
    </form>
  );
};

export default UploadForm;
