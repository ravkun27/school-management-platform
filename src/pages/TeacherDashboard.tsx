// TeacherDashboard.tsx
import { useState, FormEvent, useEffect } from "react";
import { CheckCircle, AlertCircle, Loader2, Clock } from "lucide-react";
import { CustomSelector } from "../components/ui/CustomSelector";
import Button from "../components/ui/Button";

interface ClassRequest {
  id: string;
  className: string;
  subject: string;
  requestedAt: Date;
  status: "pending" | "approved" | "rejected";
}

// Define class and subject options
const classOptions = [
  { value: "", label: "Select Class" },
  ...[...Array(12)].map((_, i) => ({
    value: `Class ${i + 1}`,
    label: `Class ${i + 1}`,
  })),
];

const subjectOptions = [
  { value: "", label: "Select Subject" },
  { value: "English", label: "English" },
  { value: "Math", label: "Math" },
  { value: "Science", label: "Science" },
  { value: "Social Studies", label: "Social Studies" },
  { value: "Hindi", label: "Hindi" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Biology", label: "Biology" },
  { value: "Geography", label: "Geography" },
  { value: "History", label: "History" },
  { value: "Economics", label: "Economics" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  { value: "Physical Education", label: "Physical Education" },
];

export const TeacherDashboard = () => {
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    className: false,
    subject: false,
  });
  const [requests, setRequests] = useState<ClassRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  // Simulated data for history tab
  useEffect(() => {
    // This would normally be an API call
    const mockRequests: ClassRequest[] = [
      {
        id: "req-001",
        className: "Class 3",
        subject: "Math",
        requestedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        status: "approved",
      },
      {
        id: "req-002",
        className: "Class 5",
        subject: "Science",
        requestedAt: new Date(Date.now() - 86400000), // 1 day ago
        status: "pending",
      },
    ];
    setRequests(mockRequests);
  }, []);

  const validateForm = () => {
    const errors = {
      className: !formData.className.trim(),
      subject: !formData.subject.trim(),
    };

    setFormErrors(errors);

    if (errors.className || errors.subject) {
      setError("Please fill in all required fields");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newRequest: ClassRequest = {
        id: `req-${Date.now().toString(36)}`,
        className: formData.className,
        subject: formData.subject,
        requestedAt: new Date(),
        status: "pending",
      };

      setRequests((prev) => [newRequest, ...prev]);
      setFormData({ className: "", subject: "" });
      setIsSuccessVisible(true);

      // Auto-switch to history tab after showing success
      setTimeout(() => {
        setIsSuccessVisible(false);
        setActiveTab("history");
      }, 3000);
    } catch (err) {
      setError(
        "Failed to submit request. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-500" size={18} />;
      case "rejected":
        return <AlertCircle className="text-red-500" size={18} />;
      default:
        return <Clock className="text-amber-500" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="bg-background border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-text">
              Teaching Request Portal
            </h1>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("form")}
              className={`${
                activeTab === "form"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              New Request
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`${
                activeTab === "history"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Request History
            </button>
          </nav>
        </div>

        {/* Success Message */}
        {isSuccessVisible && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-start">
            <CheckCircle
              className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
              size={18}
            />
            <div>
              <h3 className="text-sm font-medium text-green-800">
                Request Submitted Successfully
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Your teaching request has been submitted and is awaiting
                approval.
              </p>
            </div>
          </div>
        )}

        {/* Form Tab */}
        {activeTab === "form" && (
          <div className="bg-background shadow-sm rounded-lg border border-gray-200">
            <div className="px-4 py-4 sm:p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Submit New Teaching Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Class Selector */}
                  <div>
                    <label
                      htmlFor="className"
                      className="block text-sm font-medium text-text mb-1"
                    >
                      Class Name
                    </label>
                    <CustomSelector
                      id="className"
                      options={classOptions}
                      value={formData.className}
                      onChange={(value) =>
                        setFormData({ ...formData, className: value })
                      }
                      placeholder="Select Class"
                      disabled={isSubmitting}
                      required={true}
                      error={formErrors.className}
                      compact={true}
                    />
                  </div>

                  {/* Subject Selector */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-text mb-1"
                    >
                      Subject
                    </label>
                    <CustomSelector
                      id="subject"
                      options={subjectOptions}
                      value={formData.subject}
                      onChange={(value) =>
                        setFormData({ ...formData, subject: value })
                      }
                      placeholder="Select Subject"
                      disabled={isSubmitting}
                      required={true}
                      error={formErrors.subject}
                      compact={true}
                    />
                  </div>
                </div>

                {error && (
                  <div
                    className="bg-red-50 border border-red-200 rounded p-2 text-red-700 text-xs"
                    role="alert"
                  >
                    <div className="flex">
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-3">
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData({ className: "", subject: "" });
                      setFormErrors({ className: false, subject: false });
                      setError(null);
                    }}
                    disabled={isSubmitting}
                    className="px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Loader2 className="animate-spin -ml-1 mr-2 h-3 w-3" />
                        Processing...
                      </span>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-background shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-4 sm:px-5 sm:py-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Request History
              </h2>

              {requests.length > 0 ? (
                <div className="overflow-x-auto -mx-4 sm:-mx-5">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Request ID
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Class
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Subject
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                              {request.id}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                              {request.className}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                              {request.subject}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                              {request.requestedAt.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <div className="flex items-center">
                                {getStatusIcon(request.status)}
                                <span
                                  className={`ml-1.5 text-xs ${
                                    request.status === "approved"
                                      ? "text-green-700"
                                      : request.status === "rejected"
                                      ? "text-red-700"
                                      : "text-amber-600"
                                  }`}
                                >
                                  {request.status.charAt(0).toUpperCase() +
                                    request.status.slice(1)}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">
                  <p>No requests found. Submit a new request to see it here.</p>
                </div>
              )}

              {requests.length > 0 && (
                <div className="mt-3 text-xs text-gray-500">
                  <p>Showing {requests.length} request(s)</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
