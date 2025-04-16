import { useEffect, useState } from "react";
import DataTable from "../components/ui/DataTable";
import { generateColumnsFromData } from "../utils/generateColumns";

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  status: string;
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);

  // Simulating API call to fetch student data
  useEffect(() => {
    const fetchStudents = () => {
      const studentData: Student[] = [
        {
          id: "1",
          name: "Alice Johnson",
          email: "alice@example.com",
          enrolledCourses: 3,
          status: "active",
        },
        {
          id: "2",
          name: "Bob Smith",
          email: "bob@example.com",
          enrolledCourses: 1,
          status: "inactive",
        },
      ];
      setStudents(studentData);
    };
    fetchStudents();
  }, []);

  // Generate columns dynamically based on student data
  const columns = generateColumnsFromData<Student>(["id"]);

  console.log(columns); // Check if columns are generated

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <DataTable data={students} columns={columns} />
    </div>
  );
};

export default Students;
