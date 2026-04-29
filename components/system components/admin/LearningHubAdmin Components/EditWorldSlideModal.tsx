"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuFilePen } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSlide } from "@/backend/learningworldtopicslide";
// 👉 change to update API later
import { createSlide } from "@/backend/learningworldtopicslide";

const EditWorldSlideModal = ({ slide }: any) => {
  const queryClient = useQueryClient();

  const initialState = {
    category: "explanation",
    discussion: "",
    question: "",
    correct_answer: "",
    option1: "",
    option2: "",
    option3: "",
    spelling_word: "",
    spelling_mode: "",
    slideDuration: "",
  };

  const [activeTab, setActiveTab] = useState("explanation");
  const [slideData, setslideData] = useState(initialState);

  /* ================= PREFILL LOGIC ================= */
  useEffect(() => {
    if (slide) {
      setActiveTab(slide.category);

      setslideData({
        category: slide.category || "explanation",
        discussion: slide.discussion || "",
        question: slide.question || "",
        correct_answer: slide.correct_answer || "",
        option1: slide.option1 || "",
        option2: slide.option2 || "",
        option3: slide.option3 || "",
        spelling_word: slide.spelling_word || "",
        spelling_mode: slide.spelling_mode || "",
        slideDuration: slide.slideDuration || "",
      });
    }
  }, [slide]);

  /* ================= HANDLERS ================= */
  const handleChange = (field: string, value: string) => {
    setslideData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setslideData((prev) => ({
      ...initialState,
      category: value,
      slideDuration: prev.slideDuration, // keep duration
    }));
  };

  /* ================= MUTATION ================= */
  const { mutate: updateSlideMutate, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => updateSlide(data, id),

    onSuccess: () => {
      toast.success("Slide updated successfully");
      queryClient.invalidateQueries({ queryKey: ["worldtopicslides"] });
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    let payload: any = {
      category: slideData.category,
      slideDuration: slideData.slideDuration,
    };

    if (activeTab === "explanation") {
      payload.discussion = slideData.discussion;
    }

    if (activeTab === "quiz" || activeTab === "fillinblank") {
      payload = {
        ...payload,
        question: slideData.question,
        correct_answer: slideData.correct_answer,
        option1: slideData.option1,
        option2: slideData.option2,
        option3: slideData.option3,
      };
    }

    if (activeTab === "true/false") {
      payload = {
        ...payload,
        question: slideData.question,
        correct_answer: slideData.correct_answer,
      };
    }

    if (activeTab === "spelling") {
      payload = {
        ...payload,
        spelling_word: slideData.spelling_word,
        spelling_mode: slideData.spelling_mode,
      };
    }

    updateSlideMutate({
      data: payload,
      id: slide._id,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <LuFilePen />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Edit slide</DialogTitle>
          <DialogDescription>
            Modify the slide content based on its type
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="flex flex-wrap gap-2">
            {[
              "explanation",
              "quiz",
              "true/false",
              "fillinblank",
              "spelling",
              "essay",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white capitalize"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Explanation */}
          <TabsContent value="explanation">
            <Label>Discussion</Label>
            <Textarea
              value={slideData.discussion}
              onChange={(e) => handleChange("discussion", e.target.value)}
            />
          </TabsContent>

          {/* Quiz */}
          <TabsContent value="quiz">
            <Label>Question</Label>
            <Textarea
              value={slideData.question}
              onChange={(e) => handleChange("question", e.target.value)}
            />

            <Label>Correct Answer</Label>
            <Input
              value={slideData.correct_answer}
              onChange={(e) => handleChange("correct_answer", e.target.value)}
            />

            <div className="flex gap-2">
              <Input
                value={slideData.option1}
                onChange={(e) => handleChange("option1", e.target.value)}
              />
              <Input
                value={slideData.option2}
                onChange={(e) => handleChange("option2", e.target.value)}
              />
              <Input
                value={slideData.option3}
                onChange={(e) => handleChange("option3", e.target.value)}
              />
            </div>
          </TabsContent>

          {/* True/False */}
          <TabsContent value="true/false">
            <Textarea
              value={slideData.question}
              onChange={(e) => handleChange("question", e.target.value)}
            />
            <Input
              value={slideData.correct_answer}
              onChange={(e) => handleChange("correct_answer", e.target.value)}
            />
          </TabsContent>

          {/* fill in blank */}
          <TabsContent value="fillinblank">
            <Label>Question</Label>
            <Textarea
              value={slideData.question}
              onChange={(e) => handleChange("question", e.target.value)}
            />

            <Label>Correct Answer</Label>
            <Input
              value={slideData.correct_answer}
              onChange={(e) => handleChange("correct_answer", e.target.value)}
            />

            <div className="flex gap-2">
              <Input
                value={slideData.option1}
                onChange={(e) => handleChange("option1", e.target.value)}
              />
              <Input
                value={slideData.option2}
                onChange={(e) => handleChange("option2", e.target.value)}
              />
              <Input
                value={slideData.option3}
                onChange={(e) => handleChange("option3", e.target.value)}
              />
            </div>
          </TabsContent>

          {/* Spelling */}
          <TabsContent value="spelling">
            <Input
              value={slideData.spelling_word}
              onChange={(e) => handleChange("spelling_word", e.target.value)}
            />

            <Select
              value={slideData.spelling_mode}
              onValueChange={(val) => handleChange("spelling_mode", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="shuffle">Shuffle</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <div>
              <Label>Slide duration</Label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  className="w-20"
                  value={slideData.slideDuration}
                  onChange={(e) =>
                    handleChange("slideDuration", e.target.value)
                  }
                />
                Minutes
              </div>
            </div>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>

              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Updating..." : "Update slide"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorldSlideModal;
