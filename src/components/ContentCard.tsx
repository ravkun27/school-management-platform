import { cn } from "../utils/helper";
import { Trash2, Edit } from "lucide-react";
import Button from "./ui/Button";
// import { useAppSelector } from "../store/store";

interface ContentCardProps {
  title: string;
  description: string;
  type: "video" | "pdf";
  contentUrl: string;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ContentCard = ({
  title,
  description,
  type,
  contentUrl,
  className,
  onEdit,
  onDelete,
}: ContentCardProps) => {
  // const { user } = useAppSelector((state) => state.auth);
  // const canEdit = user?.role === "teacher" || user?.role === "admin";
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700",
        "hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        {type === "video" ? (
          <video controls className="w-full h-full object-cover">
            <source src={contentUrl} type="video/mp4" />
          </video>
        ) : (
          <iframe
            src={`${contentUrl}#view=fitH`}
            className="w-full h-full"
            title={title}
          />
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>

        {/* {canEdit && ( */}
        <div className="mt-3 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-primary"
          >
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-500"
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </Button>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default ContentCard;
