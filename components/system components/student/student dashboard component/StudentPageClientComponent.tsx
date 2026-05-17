"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentActivitiesQuery } from "@/lib/studentactivitiesQueryOptions";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IoEnterOutline } from "react-icons/io5";
import { RefreshCw, AlertCircle, Inbox } from "lucide-react";
import Link from "next/link";
const StudentPageClientComponent = () => {
  const { data, isLoading, isPending, isFetching, isError, error, refetch } =
    useQuery(getStudentActivitiesQuery());

  // ✅ Extract actual array safely
  const studentActivities = data?.data || [];

  console.log("user activities", data);

  // ============================
  // Loading State
  // ============================
  // ✅ Prevent empty state from flashing
  if (isLoading || isPending) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="rounded-2xl border shadow-sm">
            <CardContent className="p-5 space-y-4">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // ============================
  // Error State
  // ============================
  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive" className="rounded-2xl">
          <AlertCircle className="h-4 w-4" />

          <AlertTitle>Failed to load activities</AlertTitle>

          <AlertDescription className="mt-2 flex flex-col gap-3">
            <p>
              {(error as Error)?.message ||
                "Something went wrong while fetching data."}
            </p>

            <Button
              onClick={() => refetch()}
              variant="outline"
              className="w-fit"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // ============================
  // Empty State
  // ============================
  // ✅ Only show after loading finishes
  if (studentActivities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Inbox className="h-14 w-14 text-muted-foreground mb-4" />

        <h2 className="text-xl font-semibold">No Activities Found</h2>

        <p className="text-muted-foreground mt-2">
          There are currently no student activities available.
        </p>

        <Button variant="outline" className="mt-5" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Student Activities</h1>

          <p className="text-sm text-muted-foreground">
            Total Activities: {studentActivities.length}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <Separator />

      {/* Activities */}
      <ScrollArea className="h-[75vh] pr-2">
        <div className="grid grid-cols-2 gap-4">
          {studentActivities.map((activity: any, index: number) => (
            <Card
              key={activity?._id || index}
              className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 w-full"
            >
              <CardContent className="p-5 space-y-4">
                {/* Title */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {activity?.sectionActivityId?.title ||
                        "Untitled Activity"}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {activity?.sectionActivityId?.description ||
                        "No description provided."}
                    </p>
                  </div>

                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>

                <Separator />

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Section</p>

                    <p className="text-muted-foreground break-all">
                      {activity?.studentSectionId.sectionId.title}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Teacher</p>

                    <p className="text-muted-foreground break-all">
                      {activity?.studentSectionId.sectionId.teacherId.firstname}{" "}
                      {activity?.studentSectionId.sectionId.teacherId.lastname}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Created At</p>

                    <p className="text-muted-foreground">
                      {activity?.createdAt
                        ? new Date(activity.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Status</p>

                    <Badge
                      variant={activity?.isCompleted ? "default" : "outline"}
                    >
                      {activity?.isCompleted ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/dashboard/student/activity/${activity?.sectionActivityId._id}`}
                  >
                    <Button className="text-white bg-linear-to-r from-[#685AFF] to-[#008CFF] w-full">
                      Enter quiz <IoEnterOutline className="text-xl" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentPageClientComponent;
