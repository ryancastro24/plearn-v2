"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSpecificSectionActivityQuery } from "@/lib/sectionActivitiesQueryOptions";
import { getAllActivitySlidesQuery } from "@/lib/sectionActivitySlidesQueryOptions";
import BackArrowComponent from "../../admin/LearningHubAdmin Components/BackArrowComponent";
import AddSectionActivitySlide from "./AddSectionActivitySlide";
import ActivitySlideCard from "./ActivitySlideCard";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { arrayMove } from "@dnd-kit/sortable";
import FinalizingActivityModal from "./FinalizingActivityModal";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// import your backend function
import { updateSlidesOrder } from "@/backend/activitslides";

/* ================= ID NORMALIZER ================= */
const normalizeId = (id: any) => String(id);

const ActivityClientComponent = ({ activityid }: any) => {
  const queryClient = useQueryClient();

  /* ================= ACTIVITY ================= */
  const { data: activityData } = useQuery(
    getSpecificSectionActivityQuery(activityid),
  );

  /* ================= SLIDES QUERY ================= */
  const { data: activitySlidesData } = useQuery(
    getAllActivitySlidesQuery(activityid),
  );

  const activity = activityData?.data || "";

  /* ================= LOCAL STATE ================= */
  const [slides, setSlides] = useState<any[]>([]);

  /* ================= SYNC SLIDES ================= */
  useEffect(() => {
    const raw = activitySlidesData?.data || activitySlidesData || [];

    if (!Array.isArray(raw) || raw.length === 0) {
      setSlides([]);
      return;
    }

    const cleaned = raw
      .map((slide) => ({
        ...slide,
        _id: String(slide._id),
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    setSlides(cleaned);
  }, [activitySlidesData]);

  /* ================= STABLE IDS ================= */
  const slideIds = useMemo(() => slides.map((s) => s._id), [slides]);

  /* ================= DND SENSORS ================= */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  /* ================= UPDATE ORDER MUTATION ================= */
  const { mutate: updateOrderMutate } = useMutation({
    mutationFn: (data: { slides: { id: string; order: number }[] }) =>
      updateSlidesOrder(data),

    onSuccess: () => {
      toast.success("Slide order updated");

      queryClient.invalidateQueries({
        queryKey: ["activityslides", activityid],
      });
    },

    onError: (error: any) => {
      console.error(error);

      toast.error(error?.message || "Failed to update order");
    },
  });

  /* ================= DRAG END ================= */
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = normalizeId(active.id);

    const overId = normalizeId(over.id);

    const oldIndex = slides.findIndex((s) => s._id === activeId);

    const newIndex = slides.findIndex((s) => s._id === overId);

    if (oldIndex < 0 || newIndex < 0) {
      console.log("Invalid drag state", {
        activeId,
        overId,
      });

      return;
    }

    /* ================= REORDER ================= */
    const reordered = arrayMove(slides, oldIndex, newIndex);

    // optimistic update
    setSlides(reordered);

    /* ================= PAYLOAD ================= */
    const payload = {
      slides: reordered.map((slide, index) => ({
        id: String(slide._id),
        order: index,
      })),
    };

    console.log("ORDER PAYLOAD", payload);

    updateOrderMutate(payload);
  };

  return (
    <div>
      <BackArrowComponent />

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Title: {activity.title}</h2>

          <h3 className="text-sm">Description: {activity.description}</h3>

          <span className="text-sm">Type: {activity.type}</span>
        </div>
        {activity.isFinalized ? (
          <h2>Activity is Finalized</h2>
        ) : (
          <FinalizingActivityModal activityId={activityid} />
        )}
      </div>

      {/* ================= ADD BUTTON ================= */}
      <AddSectionActivitySlide activityId={activityid} />

      {/* ================= SLIDES ================= */}
      {slides.length > 0 ? (
        <div className="mt-5">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={slideIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4">
                {slides.map((slide) => (
                  <ActivitySlideCard key={slide._id} slide={slide} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ) : (
        <div className="mt-5">
          <h2>No slides available</h2>
        </div>
      )}
    </div>
  );
};

export default ActivityClientComponent;
