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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const AddNewTopicSlide = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>Add new slide</Button>
        </DialogTrigger>
        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Add new slide</DialogTitle>
            <DialogDescription>
              Select what will be the slide classification
            </DialogDescription>
          </DialogHeader>

          <div>
            <Tabs defaultValue="explanation" className="w-full">
              <TabsList className="flex items-center gap-2">
                <TabsTrigger
                  value="explanation"
                  className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                >
                  Explanation
                </TabsTrigger>

                <TabsTrigger
                  value="quiz"
                  className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                >
                  Quiz
                </TabsTrigger>

                <TabsTrigger
                  value="true/false"
                  className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                >
                  True/False
                </TabsTrigger>

                <TabsTrigger
                  value="fillinblank"
                  className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                >
                  Fill in blank
                </TabsTrigger>

                <TabsTrigger
                  value="spelling"
                  className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                >
                  Spelling
                </TabsTrigger>

                <TabsTrigger
                  value="essay"
                  className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                >
                  Essay
                </TabsTrigger>
              </TabsList>

              <TabsContent value="explanation">
                <div className="flex flex-col gap-2">
                  <Label>Discussion</Label>
                  <Textarea className="h-30" placeholder="Enter discussion" />
                </div>
              </TabsContent>

              <TabsContent value="quiz">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Question</Label>
                    <Textarea placeholder="Enter question" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Correct answer</Label>
                    <Input placeholder="Enter correct answer" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs"> Choice number 1</Label>
                      <Input placeholder="Enter choice number1" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Choice number 2</Label>
                      <Input placeholder="Enter choice number2" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Choice number 3</Label>
                      <Input placeholder="Enter choice number3" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="true/false">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Question</Label>
                    <Textarea placeholder="Enter question" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">
                      Put True if true and then false if False
                    </Label>
                    <Input placeholder="Enter correct answer" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fillinblank">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Question</Label>
                    <Textarea placeholder="Enter question" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Correct answer</Label>
                    <Input placeholder="Enter correct answer" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs"> Choice number 1</Label>
                      <Input placeholder="Enter choice number1" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Choice number 2</Label>
                      <Input placeholder="Enter choice number2" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Choice number 3</Label>
                      <Input placeholder="Enter choice number3" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="spelling">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Word to spell</Label>
                    <Input placeholder="Enter word to spell" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Mode</Label>
                    <Select>
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="light">Type</SelectItem>
                          <SelectItem value="dark">Shuffle letters</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="essay">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <div className="flex items-end  justify-between w-full ">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Slide duration</Label>
                <div className="flex items-center gap-1">
                  <Input className="w-20" type="number" />
                  Minutes
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button variant={"secondary"}>Close</Button>
                </DialogClose>
                <Button className="bg-[#ff5b5b] text-white">
                  Create slide
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
