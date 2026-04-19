"use client";

import AddNewTopicSlide from "@/components/system components/LearningHubAdmin Components/AddNewTopicSlide";
import BackArrowComponent from "@/components/system components/LearningHubAdmin Components/BackArrowComponent";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLearningWorldTopicData } from "@/lib/learningworldTopicsQueryOptions";
import { getLearningWorldTopicSlides } from "@/lib/learningworldtopicSlidesQueryOptions";
import SlideCardComponent from "./SlideCardComponent";
import EditTopicModal from "./EditTopicModal";
import DeleteTopicModal from "./DeleteTopicModal";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { arrayMove } from "@dnd-kit/sortable";

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

import { updateSlidesOrder } from "@/backend/learningworldtopicslide";

/* ================= ID NORMALIZER ================= */
const normalizeId = (id: any) => String(id);

const TopicSlideCreationClientComponent = ({ topicid }: any) => {
  const queryClient = useQueryClient();

  /* ================= TOPIC ================= */
  const { data: topicData } = useQuery(getLearningWorldTopicData(topicid));

  const topicDetails = topicData?.data;

  /* ================= SLIDES QUERY ================= */
  const { data: slidesData } = useQuery(getLearningWorldTopicSlides(topicid));

  /* ================= LOCAL STATE ================= */
  const [slides, setSlides] = useState<any[]>([]);

  /* ================= SYNC SLIDES SAFELY ================= */
  useEffect(() => {
    const raw = slidesData?.data ?? slidesData;

    if (!Array.isArray(raw) || raw.length === 0) {
      setSlides([]); // 🔥 IMPORTANT RESET
      return;
    }

    const cleaned = raw
      .map((s) => ({
        ...s,
        _id: String(s._id),
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    setSlides(cleaned);
  }, [slidesData]);

  /* ================= STABLE IDS (PREVENT RE-RANDOMIZATION) ================= */
  const slideIds = useMemo(() => slides.map((s) => s._id), [slides]);

  /* ================= DND SENSORS ================= */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  /* ================= MUTATION ================= */
  const { mutate: updateOrderMutate } = useMutation({
    mutationFn: (data: { slides: { id: string; order: number }[] }) =>
      updateSlidesOrder(data),

    onSuccess: () => {
      toast.success("Order updated");

      queryClient.invalidateQueries({
        queryKey: ["worldtopicslides", topicid],
      });
    },

    onError: (err: any) => {
      console.error(err);
      toast.error("Failed to update order");
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
        slides,
      });
      return;
    }

    const reordered = arrayMove(slides, oldIndex, newIndex);

    // update UI immediately
    setSlides(reordered);

    // send clean payload
    const payload = {
      slides: reordered.map((s, index) => ({
        id: String(s._id),
        order: index,
      })),
    };

    console.log("ORDER PAYLOAD:", payload);
    updateOrderMutate(payload);
  };

  /* ================= UI ================= */
  return (
    <div className="p-5 flex flex-col gap-5 w-full relative">
      {/* HEADER */}
      <div>
        <BackArrowComponent />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2>{topicDetails?.title}</h2>
            <h3 className="text-xs">{topicDetails?.description}</h3>
          </div>

          <div className="flex items-center gap-2">
            <EditTopicModal topicDetails={topicDetails} />
            <DeleteTopicModal topicid={topicid} />
          </div>
        </div>
      </div>

      {/* SLIDES */}
      {slides.length > 0 ? (
        <div>
          <h2>Available slides</h2>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={slideIds} // 🔥 stable memoized ids
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4 mt-2">
                {slides.map((slide) => (
                  <SlideCardComponent key={slide._id} slide={slide} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ) : (
        <div>
          <h2>No slides available</h2>
        </div>
      )}

      {/* ADD BUTTON */}
      <div className="fixed bottom-6 right-6 z-20">
        <AddNewTopicSlide topicid={topicid} />
      </div>
    </div>
  );
};

export default TopicSlideCreationClientComponent;
