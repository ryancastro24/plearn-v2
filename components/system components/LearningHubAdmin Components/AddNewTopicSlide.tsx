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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuFilePlus2 } from "react-icons/lu";
import { createSlide } from "@/backend/learningworldtopicslide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddNewTopicSlide = ({ topicid }: any) => {
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
    duration: "",
  };

  const [activeTab, setActiveTab] = useState("explanation");
  const [newSlide, setNewSlide] = useState(initialState);

  /* ================= HANDLERS ================= */
  const handleChange = (field: string, value: string) => {
    setNewSlide((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setNewSlide({
      ...initialState,
      category: value,
    });
  };

  /* ================= MUTATION ================= */
  const { mutate: createSlideMutate, isPending } = useMutation({
    mutationFn: createSlide,

    onSuccess: () => {
      alert("Slide created!");

      queryClient.invalidateQueries({ queryKey: ["worldtopicslides"] });

      setNewSlide(initialState);
      setActiveTab("explanation");
    },

    onError: (error: any) => {
      alert(error.message);
    },
  });

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    let payload: any = {
      category: newSlide.category,
      duration: newSlide.duration,
      topicId: topicid,
    };

    if (activeTab === "explanation") {
      payload.discussion = newSlide.discussion;
    }

    if (activeTab === "quiz" || activeTab === "fillinblank") {
      payload = {
        ...payload,
        question: newSlide.question,
        correct_answer: newSlide.correct_answer,
        option1: newSlide.option1,
        option2: newSlide.option2,
        option3: newSlide.option3,
      };
    }

    if (activeTab === "true/false") {
      payload = {
        ...payload,
        question: newSlide.question,
        correct_answer: newSlide.correct_answer,
      };
    }

    if (activeTab === "spelling") {
      payload = {
        ...payload,
        word: newSlide.spelling_word,
        mode: newSlide.spelling_mode,
      };
    }

    createSlideMutate(payload);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] text-white flex items-center gap-2 shadow-lg shadow-black/30  ">
            <LuFilePlus2 /> Add new slide
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Add new slide</DialogTitle>
            <DialogDescription>
              Select what will be the slide classification
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="explanation"
            className="w-full"
            onValueChange={handleTabChange}
          >
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
                className="h-30"
                value={newSlide.discussion}
                onChange={(e) => handleChange("discussion", e.target.value)}
              />
            </TabsContent>

            {/* Quiz */}
            <TabsContent value="quiz">
              <Label>Question</Label>
              <Textarea
                value={newSlide.question}
                onChange={(e) => handleChange("question", e.target.value)}
              />

              <Label>Correct Answer</Label>
              <Input
                value={newSlide.correct_answer}
                onChange={(e) => handleChange("correct_answer", e.target.value)}
              />

              <div className="flex gap-2">
                <Input
                  placeholder="Choice 1"
                  value={newSlide.option1}
                  onChange={(e) => handleChange("option1", e.target.value)}
                />
                <Input
                  placeholder="Choice 2"
                  value={newSlide.option2}
                  onChange={(e) => handleChange("option2", e.target.value)}
                />
                <Input
                  placeholder="Choice 3"
                  value={newSlide.option3}
                  onChange={(e) => handleChange("option3", e.target.value)}
                />
              </div>
            </TabsContent>

            {/* True/False */}
            <TabsContent value="true/false">
              <Label>Question</Label>
              <Textarea
                value={newSlide.question}
                onChange={(e) => handleChange("question", e.target.value)}
              />

              <Label>Answer (true/false)</Label>
              <Input
                value={newSlide.correct_answer}
                onChange={(e) => handleChange("correct_answer", e.target.value)}
              />
            </TabsContent>

            {/* Fill in blank */}
            <TabsContent value="fillinblank">
              <Label>Question</Label>
              <Textarea
                value={newSlide.question}
                onChange={(e) => handleChange("question", e.target.value)}
              />

              <Label>Correct Answer</Label>
              <Input
                value={newSlide.correct_answer}
                onChange={(e) => handleChange("correct_answer", e.target.value)}
              />

              <div className="flex gap-2">
                <Input
                  placeholder="Choice 1"
                  value={newSlide.option1}
                  onChange={(e) => handleChange("option1", e.target.value)}
                />
                <Input
                  placeholder="Choice 2"
                  value={newSlide.option2}
                  onChange={(e) => handleChange("option2", e.target.value)}
                />
                <Input
                  placeholder="Choice 3"
                  value={newSlide.option3}
                  onChange={(e) => handleChange("option3", e.target.value)}
                />
              </div>
            </TabsContent>

            {/* Spelling */}
            <TabsContent value="spelling">
              <Label>Word</Label>
              <Input
                value={newSlide.spelling_word}
                onChange={(e) => handleChange("spelling_word", e.target.value)}
              />

              <Label>Mode</Label>
              <Select
                onValueChange={(value) => handleChange("spelling_mode", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="type">Type</SelectItem>
                    <SelectItem value="shuffle">Shuffle letters</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TabsContent>

            {/* Essay */}
            <TabsContent value="essay">
              <p className="text-sm text-gray-500">Essay type (extend later)</p>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <div className="flex justify-between w-full items-end">
              <div>
                <Label>Slide duration</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    className="w-20"
                    value={newSlide.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                  />
                  Minutes
                </div>
              </div>

              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>

                <Button
                  className="bg-[#ff5b5b] text-white"
                  onClick={handleSubmit}
                  disabled={isPending}
                >
                  {isPending ? "Creating..." : "Create slide"}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewTopicSlide;
