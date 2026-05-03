"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getTeacherSectionsQuery } from "@/lib/sectionsQueryOptions";

const ClassesClientComponent = () => {
  const { data, isPending, isError, error } = useQuery(
    getTeacherSectionsQuery(),
  );

  // 🔄 Loading state
  if (isPending) {
    return (
      <div className="p-4">
        <p>Loading classes...</p>
      </div>
    );
  }

  // ❌ Error state
  if (isError) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error?.message || "Something went wrong"}</p>
      </div>
    );
  }

  const sections = data?.data || [];

  // 📭 Empty state
  if (!sections.length) {
    return (
      <div className="p-4">
        <p>No classes found.</p>
      </div>
    );
  }

  // ✅ Render data
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sections.map((section: any) => (
        <Link
          key={section._id}
          href={`/dashboard/teacher/classes/${section._id}`}
        >
          <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="text-sm text-gray-500">{section.subject}</p>

            <div className="mt-2 text-sm">
              <p>
                <strong>Grade:</strong> {section.grade}
              </p>
              <p>
                <strong>Students:</strong> {section.students?.length || 0}
              </p>
            </div>

            <div className="mt-3 text-xs text-gray-400">
              Created: {new Date(section.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ClassesClientComponent;
