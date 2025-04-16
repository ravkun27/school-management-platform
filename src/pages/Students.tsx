// StudentsPage.tsx
import DataTable from "../components/ui/DataTable";
import Card from "../components/ui/Card";

const Students = () => {
  const mockStudents = [
    { id: 1, name: "John Doe", grade: "10th", attendance: "95%" },
    { id: 2, name: "Jane Smith", grade: "11th", attendance: "89%" },
    { id: 3, name: "Alice Johnson", grade: "12th", attendance: "92%" },
    { id: 4, name: "Bob Brown", grade: "9th", attendance: "88%" },
    { id: 5, name: "Charlie Davis", grade: "10th", attendance: "94%" },
    { id: 6, name: "Diana Evans", grade: "11th", attendance: "90%" },
    { id: 7, name: "Ethan Foster", grade: "12th", attendance: "87%" },
    { id: 8, name: "Fiona Green", grade: "9th", attendance: "93%" },
    { id: 9, name: "George Harris", grade: "10th", attendance: "96%" },
    { id: 10, name: "Hannah Irving", grade: "11th", attendance: "91%" },
    // Add more entries...
  ];
  const studentColumns = [
    { header: "Name", accessorKey: "name" },
    { header: "Grade", accessorKey: "grade" },
    { header: "Attendance", accessorKey: "attendance" },
  ];

  return (
    <div className="p-6">
      {/* Data Tables */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Students</h3>
        <DataTable data={mockStudents} columns={studentColumns} pageSize={5} />
      </Card>
    </div>
  );
};

export default Students;
