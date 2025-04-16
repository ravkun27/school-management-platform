import Card from "../components/ui/Card";
import { Users, BookOpen, GraduationCap, BarChart } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: <GraduationCap size={24} />,
    },
    { title: "Total Teachers", value: "45", icon: <Users size={24} /> },
    { title: "Total Courses", value: "89", icon: <BookOpen size={24} /> },
    { title: "Attendance Rate", value: "92%", icon: <BarChart size={24} /> },
  ];
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            {stat.icon}
          </div>
          <div>
            <h3 className="text-gray-600 dark:text-gray-300 text-sm">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </Card>
      ))}

      {/* Add charts and recent activities */}
    </div>
  );
};

export default AdminDashboard;
