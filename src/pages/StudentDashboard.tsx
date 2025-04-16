import { FC } from "react";
import ContentCard from "../components/ContentCard";
import { useQuery } from "@tanstack/react-query";
// import { fetchContent } from "../services/contentService";
import Alert from "../components/ui/Alert";
import Card from "../components/ui/Card";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "video" | "pdf"; // Only allows these two specific types
  url: string;
}

const StudentDashboard: FC = () => {
  const {
    data: content,
    isLoading,
    error,
  } = useQuery<ContentItem[]>({
    queryKey: ["content"],
    // queryFn: fetchContent,
  });

  return (
    <div className="space-y-6">
      <Card
        title="Available Learning Materials"
        description=""
        className="mb-6"
      >
        {error && (
          <Alert
            variant="error"
            title="Error"
            message="Failed to load content"
          />
        )}

        {isLoading && <div>Loading...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              description={item.description}
              type={item.type}
              contentUrl={item.url}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;
