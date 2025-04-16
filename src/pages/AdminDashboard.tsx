// AdminDashboard.tsx
import Card from "../components/ui/Card";
import { Users, BookOpen, GraduationCap, BarChart, Clock } from "lucide-react";
import { ChartComponent } from "../components/ui/ChartComponent";
import DataTable from "../components/ui/DataTable";

const AdminDashboard = () => {
  const attendanceData = [
    { month: "Jan", attendance: 85 },
    { month: "Feb", attendance: 92 },
    { month: "Mar", attendance: 88 },
    { month: "Apr", attendance: 95 },
    { month: "May", attendance: 90 },
    { month: "Jun", attendance: 96 },
  ];

  const ratioData = [
    { name: "Students", value: 1234 },
    { name: "Teachers", value: 45 },
  ];

  const courseColumns = [
    { header: "Course", accessorKey: "name" },
    { header: "Enrolled", accessorKey: "enrolled" },
    { header: "Status", accessorKey: "status" },
  ];

  const mockCourses = [
    { id: 1, name: "Algebra 101", enrolled: 120, status: "Active" },
    { id: 2, name: "Physics Basics", enrolled: 85, status: "Active" },
  ];
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: <GraduationCap size={24} />,
      trend: "+12.3%",
    },
    {
      title: "Total Teachers",
      value: "45",
      icon: <Users size={24} />,
      trend: "+2.1%",
    },
    {
      title: "Total Courses",
      value: "89",
      icon: <BookOpen size={24} />,
      trend: "-3.4%",
    },
    {
      title: "Attendance Rate",
      value: "92%",
      icon: <BarChart size={24} />,
      trend: "+1.8%",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New student enrollment",
      time: "5 min ago",
      type: "success",
    },
    {
      id: 2,
      title: "Mathematics course updated",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 3,
      title: "System maintenance scheduled",
      time: "4 hours ago",
      type: "warning",
    },
    {
      id: 4,
      title: "Password policy updated",
      time: "1 day ago",
      type: "error",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
              <span
                className={`text-sm ${
                  stat.trend.startsWith("+") ? "text-success" : "text-error"
                }`}
              >
                {stat.trend}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Attendance Trend</h3>
          <ChartComponent
            data={attendanceData}
            type="line"
            xAxisKey="month"
            dataKey="attendance"
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Student-Teacher Ratio</h3>
          <ChartComponent
            data={ratioData}
            type="pie"
            xAxisKey="name"
            dataKey="value"
          />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Courses</h3>
        <DataTable data={mockCourses} columns={courseColumns} pageSize={5} />
      </Card>

      {/* Recent Activities */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activities</h3>
          <button className="text-primary text-sm font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div
                className={`mt-1 p-2 rounded-full bg-${activity.type}/10 text-${activity.type}`}
              >
                <Clock size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{activity.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
