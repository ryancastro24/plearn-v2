import { LuFileMinus2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { IoIosAttach } from "react-icons/io";
import EditWorldSlideModal from "./EditWorldSlideModal";
import { MdOutlineDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LuClock3 } from "react-icons/lu";
import DeleteTopicSlideModal from "./DeleteTopicSlideModal";
const SlideCardComponent = ({ slide }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slide._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-100 rounded p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* 🔥 DRAG HANDLE */}
          <span
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-500"
          >
            <MdOutlineDragIndicator />
          </span>

          <h2>Category: {slide.category}</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-200 rounded p-2">
            <Button variant={"outline"} size={"xs"}>
              <LuClock3 className="text-lg" />
            </Button>
            <span>{slide.slideDuration} Minutes</span>
          </div>
          <Button
            disabled={slide.category !== "explanation"}
            variant={"outline"}
            size={"sm"}
          >
            <IoIosAttach />
          </Button>

          <EditWorldSlideModal slide={slide} />
          <DeleteTopicSlideModal id={slide._id} />
        </div>
      </div>

      <div className="mt-4">
        {slide.category === "explanation" ? (
          <p className="text-sm">{slide.discussion}</p>
        ) : (
          <div>
            <h3 className="text-sm">{slide.question}</h3>

            <div className="flex flex-col gap-2 mt-3">
              {slide.correct_answer && (
                <span className="text-sm">
                  <strong>Correct Answer:</strong> {slide.correct_answer}
                </span>
              )}

              {slide.option1 && (
                <span className="text-sm">
                  <strong>Option #1:</strong> {slide.option1}
                </span>
              )}

              {slide.option2 && (
                <span className="text-sm">
                  <strong>Option #2:</strong> {slide.option2}
                </span>
              )}

              {slide.option3 && (
                <span className="text-sm">
                  <strong>Option #3:</strong> {slide.option3}
                </span>
              )}

              {slide.spelling_word && (
                <span className="text-sm">
                  <strong>Word to spell:</strong> {slide.spelling_word}
                </span>
              )}

              {slide.spelling_mode && (
                <span className="text-sm">
                  <strong>Spelling Mode:</strong> {slide.spelling_mode}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideCardComponent;
