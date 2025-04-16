import { toast } from "sonner";

const apiUrl = "https://test.madrasaplatform.com/v1"; // Replace with your actual API URL

if (!apiUrl) {
  throw new Error("API URL is missing. Check your environment variables.");
}

type ApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type ApiResponse<T> = Promise<T>;
type ApiBody = Record<string, any> | FormData;

async function apiCall<T = any>(
  path: string,
  body: ApiBody = {},
  method: ApiMethod = "GET"
): ApiResponse<T> {
  const url = `${apiUrl}${path}`;

  // Initialize options with credentials included
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {} as Record<string, string>,
  };

  if (method !== "GET") {
    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
    }
  }

  const token = localStorage.getItem("token");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const res: Response = await fetch(url, options);

    // Handle 204 No Content safely
    if (res.status === 204) {
      console.log("Received 204 No Content");
      toast.success("Success!");
      return {} as T;
    }

    let result: any;
    try {
      result = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON response:", err);
      toast.error("Failed to parse response");
      throw new Error("Failed to parse response");
    }

    if (res.ok) {
      toast.success(result?.message || "Success!");
      return result;
    } else {
      const errorMessage =
        result?.message || `API Error: ${res.status} ${res.statusText}`;
      toast.error(errorMessage);
      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Network or API Error:", error);
    throw error;
  }
}

// Utility functions for specific HTTP methods
const getFetch = <T>(path: string) => apiCall<T>(path);
const postFetch = <T>(path: string, body: ApiBody) =>
  apiCall<T>(path, body || {}, "POST");
const patchFetch = <T>(path: string, body: ApiBody) =>
  apiCall<T>(path, body, "PATCH");
const putFetch = <T>(path: string, body: ApiBody) =>
  apiCall<T>(path, body, "PUT");
const deleteFetch = <T>(path: string, body?: ApiBody) =>
  apiCall<T>(path, body, "DELETE");

export { getFetch, postFetch, patchFetch, putFetch, deleteFetch };
