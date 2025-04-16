// StudentsPage.tsx
import DataTable from "../components/ui/DataTable";
import Card from "../components/ui/Card";

const Teachers = () => {
  const mockTeachers = [
    {
      id: 1,
      name: "Mr. Johnson",
      subject: "Mathematics",
      experience: "5 years",
    },
    { id: 2, name: "Ms. Williams", subject: "Physics", experience: "8 years" },
    { id: 3, name: "Mr. Brown", subject: "Chemistry", experience: "10 years" },
    { id: 4, name: "Ms. Davis", subject: "Biology", experience: "7 years" },
    { id: 5, name: "Mr. Miller", subject: "History", experience: "6 years" },
    { id: 6, name: "Ms. Wilson", subject: "Geography", experience: "4 years" },
    { id: 7, name: "Mr. Moore", subject: "English", experience: "9 years" },
    { id: 8, name: "Ms. Taylor", subject: "Art", experience: "3 years" },
    { id: 9, name: "Mr. Anderson", subject: "Physical Education", experience: "12 years" },
    { id: 10, name: "Ms. Thomas", subject: "Music", experience: "2 years" },
  ];
  const teacherColumns = [
    { header: "Name", accessorKey: "name" },
    { header: "Subject", accessorKey: "subject" },
    { header: "Experience", accessorKey: "experience" },
  ];

  return (
    <div className="p-6">
      {/* Data Tables */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Students</h3>
        <DataTable data={mockTeachers} columns={teacherColumns} pageSize={5} />
      </Card>
    </div>
  );
};

export default Teachers;
